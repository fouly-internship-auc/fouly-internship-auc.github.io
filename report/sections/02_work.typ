= Description of the Work

== The Product: Perfetto

Perfetto is Google's open-source performance instrumentation and trace
analysis stack. It is the tool that most Android, Chrome and server teams
inside the company reach for when they need to understand what a program
was doing nanosecond-by-nanosecond on real hardware. A Perfetto trace is a
binary protobuf stream that captures everything from scheduler decisions
and memory snapshots to GPU activity and custom application events; the
trace processor turns that stream into a relational database that the user
can query with SQL.

Although Perfetto already understood a great deal about what a CPU was
doing, one important thing it could not see well was *what instructions* a
core had executed. That information lives in a much lower-level facility
that ARM cores expose, called the *Embedded Trace Macrocell* (ETM). The
gap between "Perfetto knows ETM data exists" and "Perfetto can decode,
align, query and visualise ETM data" was the gap I was hired to close.

== The Problem: ETM Traces

ETM is the on-die hardware that emits a cycle-accurate, lossless record of
which instructions a CPU executed and roughly when. The packet stream that
comes out of it is dense — a saturated trace can easily hit gigabytes a
second per core — and the documentation that explains how to parse it is
thin, scattered across ARM architecture manuals, kernel headers and the
source of an external decoder library. The packets are also expressed in
*their own time domain*: a hardware clock that does not directly line up
with the kernel timestamps that the rest of Perfetto uses.

In other words, before any of this data was useful inside Perfetto, three
things had to be true:

+ The trace bytes had to be *decoded* into structured records.
+ Those records had to be *aligned* with the global timeline so they could
  be cross-referenced with everything else in the trace.
+ The decoded, aligned records had to be *queryable* using the same
  relational machinery that already powered the rest of the trace processor.

Each of these turned out to be a mathematical question dressed up as an
engineering one.

== Mathematical Lens 1 — Relational Algebra and Set Theory

The dominant idiom inside the Perfetto trace processor is relational. Once a
trace is loaded, every concept inside it — a thread, a slice, a counter
sample — is a row in a relation, and analyses are written as SQL queries
joined and filtered across those relations.

To make ETM fit this idiom I designed and implemented a family of *SQL
table-valued functions* and *virtual tables* that present ETM packet
streams as ordinary relations. The central virtual table is the
*decoded-chunk* table, whose row schema includes
`element_type`, `timestamp`, `cycle_count`, `last_seen_timestamp`,
`cumulative_cycles`, `isa`, an embedded `instruction_range`, and
several other diagnostic columns. The `last_seen_timestamp` and
`cumulative_cycles` columns in particular were added by my PRs
\#2643 and \#2706; they make per-row aggregate state directly
queryable without an explicit user-side window.

With the data in that shape, questions like "which symbols were
active when this slice ran?" reduce to ordinary relational joins
against the symbol-range relation. Many of those joins are
*interval-against-interval* joins, where two rows match when their
half-open address or time ranges intersect:

$ [a_1, b_1) inter [a_2, b_2) eq.not emptyset $

These are well-studied joins in database theory but they have to be
implemented carefully when the relations have hundreds of millions of rows;
several of the PRs I landed (notably `tp: etm: improve etm decode` and
`tp: etm: fix cycle count for joins`) were specifically about making these
relational operations correct and tractable at scale.

The set-theoretic part of this is not ornamental. The semantics of the SQL
that the trace processor exposes is grounded in the relational algebra
introduced by Codd: selection, projection, join, union, difference and
their algebraic identities. When I argued for the design of one operator
over another in a design review, the argument was usually that one form had
a cleaner algebraic structure than the other, which made it easier to
reason about and easier for the optimiser to push predicates through.

== Mathematical Lens 2 — Aligning Two Clocks

The ETM packet stream carries its own timestamp counter. That counter is
driven by a *hardware clock* whose frequency, phase, and even start moment
are independent of the kernel's `CLOCK_MONOTONIC`, which is the clock the
rest of Perfetto trusts. If we treated the ETM timestamps as if they were
already system timestamps, every ETM instruction would land in the wrong
place on the trace timeline by an unknown amount.

The right way to think about this is as a mapping between two affine
one-dimensional spaces. If $t_("etm")$ is a timestamp in the ETM clock
domain and $t_("sys")$ is the corresponding timestamp in the system clock
domain, then to first order

$ t_("sys") = alpha dot t_("etm") + beta, $

where $alpha$ is the ratio of the two clock frequencies and $beta$ is a
fixed offset. Recovering $alpha$ and $beta$ amounts to fitting an affine
map from a small number of *synchronisation events* — moments in the trace
where both clocks are observed at the same physical instant.

I authored a comprehensive design document detailing this framework. The
document covered how synchronisation events are identified in the raw
trace; how the affine parameters are estimated; how they are extrapolated
forward and backward in time; and how to detect when the affine model
itself breaks down, for example when the hardware enters a sleep state and
the ETM clock pauses while the system clock continues. The implementation
itself was scoped to the version of the algorithm that handles the common,
single-domain case; the design document explicitly captures the more
general cases as a roadmap for future work.

== Mathematical Lens 3 — Aggregation Over Ordered Streams

Once ETM execution records exist as relations, the next class of question
is *aggregate*: "how many cycles in total did this instruction range
consume across the lifetime of the trace?" or "what was the last time we
saw any instruction from this region execute?"

These questions are folds (in the functional-programming sense) or scans
(in the database sense) over an ordered stream of execution intervals.
Concretely, for the cumulative cycle count over an instruction range $R$,
the aggregate I implemented computes

$ C(R) = sum_(r in cal(I), r.text("addr") in R) r.text("cycles"), $

where $cal(I)$ is the set of decoded execution intervals. The
*last-seen-timestamp* aggregate is the analogous `max` over `ts`. Both are
exposed as user-defined aggregate functions in the SQL surface so that
analysts and product engineers can use them in the same queries they use
for any other counter.

The PRs `tp: etm: adds last seen timestamp and cumulative cycles` and
`tp: etm: fix cycle count for joins` are the load-bearing changes in this
area.

== Deliverables

By the end of the internship, eighteen of my changelists had been reviewed
and landed in the public Perfetto repository. The full list lives at
`github.com/google/perfetto/pulls?q=is:pr+author:OmarElfouly+is:closed` and
groups roughly into four themes:

#block(inset: (left: 1em), [
  #set list(spacing: 0.6em)
  - *Standard library and symbolization* — Perfetto's SQL stdlib gained a
    `symbolize` function, an `_linux_perf_etm_metadata` view exposing file
    names and relative program counters, and a diff-test harness covering
    symbolize and ETM behaviours. The LLVM symbolizer was added as a
    first-class build dependency.
  - *ETM decode* — improvements to the trace-processor side of ETM
    decoding, including a binary-info error fix, the rename of `trace` to
    `chunk` for clarity, the symbolisation of C++ virtual table calls, and
    a fix to a long-standing workaround that affected zipped traces.
  - *Aggregation* — last-seen timestamps, cumulative cycle counts, and the
    fixes to make cycle-count joins behave correctly under the new model.
  - *UI and build* — a dedicated ETM *session track* in the Perfetto UI so
    that ETM data is visible alongside the rest of the trace; the
    `llvm-dev` dependency wired into the sandbox CI; and the mutual
    exclusion of the `llvm_symbolizer` and `libcxx` build flags so that
    the two are no longer accidentally combined.
])

In parallel with the code, I delivered the design document for the
clock-mapping framework and a final presentation to the Web Performance
team in which I fielded questions from senior engineers and tech leads.
