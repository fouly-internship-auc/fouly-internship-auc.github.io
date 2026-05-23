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
align, query and visualise ETM data" was the gap I closed.

== The Problem: ETM Traces

ETM is hardware that emits a cycle-accurate record
of which instructions a CPU executed and when. The packet
stream that comes out of it is dense — a saturated trace can easily hit
gigabytes a second per core — and the documentation that explains how
to parse it is thin, scattered across ARM architecture manuals, kernel
headers and Perfetto's own decoder, to which I ended up contributing
non-trivial pieces myself. The packets are also expressed in *their
own time domain*: a hardware clock that does not directly line up with
the kernel timestamps that the rest of Perfetto uses.

In other words, before any of this data was useful inside Perfetto, three
things had to be true:

+ The trace bytes had to be *decoded* into structured records.
+ Those records had to be *aligned* with the global timeline so they could be cross-referenced with everything else in the trace.
+ The decoded, aligned records had to be *queryable* using the same
  relational machinery that already powered the rest of the trace processor.

Each of these turned out to be questions with both engineering and mathematical themes.

== Mathematical Lens 1 — Relations, Joins and Query Cost

The dominant idiom inside the Perfetto trace processor is relational,
and almost everything around it is written in *Perfetto SQL itself*:
the standard library, the analysis primitives, the table-valued
functions, the diff tests. Adding a new capability to Perfetto often means writing more SQL rather than more C++ (not true in my case).

To make ETM fit this idiom I designed and implemented a family of
*SQL table-valued functions* and *virtual tables* that present ETM
packet streams as ordinary relations. The central virtual table is
the *decoded-chunk* table, whose row schema includes `element_type`,
`timestamp`, `cycle_count`, `last_seen_timestamp`, `cumulative_cycles`,
`isa`, an embedded `instruction_range`, and several other diagnostic
columns. The `last_seen_timestamp` and `cumulative_cycles` columns in
particular were added by my PRs \#2643 and \#2706; they make per-row
aggregate state directly queryable without an explicit user-side
window.

With the data in that shape, questions like "which symbols were
active when this slice ran?" reduce to ordinary relational joins
against the symbol-range relation. Many of those joins are
*interval-against-interval* joins, where two rows match when their
half-open address or time ranges intersect:

$ [a_1, b_1) inter [a_2, b_2) eq.not emptyset $

These are well-studied joins in database theory, but writing one that
behaves well against a Perfetto trace turned out to require a more
specific kind of mathematical thinking than I had expected: *query
cost analysis* against the particular engine Perfetto ships with.

Perfetto's SQL engine is heavily tuned for what the team described
as *tall tables* — relations with far more rows than columns, where
a typical analytic query is going to walk through hundreds of
millions of rows in a single scan. That assumption shows up
everywhere in the engine's internal cost model: in the join
strategies it prefers, in how it pushes predicates through, in how
aggressively it materialises intermediate results. A query that
looks correct in pure relational terms can still be wildly wrong in
*cost* against this engine — for example by triggering a full
re-scan of an intermediate relation that a slightly different
phrasing would have allowed it to skip.

A meaningful fraction of the design-review conversation on the ETM
join PRs — notably `tp: etm: improve etm decode` and `tp: etm: fix cycle count for joins` — was therefore not about whether a query was
algebraically right but about whether it was *cheap*: how the engine
would decompose it, how the predicate-push-down would route through
it, what the row counts at each intermediate stage would look like.
Learning to read the engine's cost behaviour well enough to predict
that, on a codebase whose authors had spent years tuning it, was the
bulk of the mathematical-software learning curve in the first half
of the internship.

== Mathematical Lens 2 — Aligning Two Clocks

The ETM packet stream carries its own timestamp counter. That counter
is driven by a *hardware clock* whose frequency, phase, and even
start moment are independent of the kernel's `CLOCK_MONOTONIC`, which
is the clock the rest of Perfetto trusts. If we treated the ETM
timestamps as if they were already system timestamps, every ETM
instruction would land in the wrong place on the trace timeline by
an unknown amount.

The right way to think about this is as a mapping between two affine
one-dimensional spaces. If $t_("etm")$ is a timestamp in the ETM
clock domain and $t_("sys")$ is the corresponding timestamp in the
system clock domain, then to first order

$ t_("sys") = alpha dot t_("etm") + beta, $

where $alpha$ is the ratio of the two clock frequencies and $beta$
is a fixed offset.

The interesting part of this lens is not the model — the model was
obvious once stated — but the path from the wrong solution to the
right one.

My initial direction, which I worked into a design document over the
course of several iterations, was to recover $alpha$ and $beta$ from
the trace itself. The plan was a *sidecar trace*: a parallel stream
of explicit synchronisation markers in both clock domains, captured
alongside the main ETM trace, fit at the end by treating the two
sequences as a one-dimensional regression problem. That approach was
workable but unsatisfying. It added a second tracing stream, it
introduced its own failure modes, and it spent inference effort on
parameters that the hardware already knew but was not being asked
to report.

The eventual resolution was simpler. The device exposes its clock
configuration directly, in an internal register that the trace
prologue can read at the moment tracing begins. Read once, parsed
into $(alpha, beta)$, the affine map then applies to every subsequent
ETM timestamp by construction. No fitting, no sidecar trace, no
synchronisation events. The design document survives in part as the
record of arriving at the simpler answer the long way round, which
is itself representative of how a non-trivial fraction of the
internship's design work proceeded: write down the obvious-looking
solution, argue with it for a week, find the one a serious hardware
person would have written down on day one.

== Mathematical Lens 3 — Aggregation Over Ordered Streams

Once ETM execution records exist as relations, the next class of question
is *aggregate*: "how many cycles in total did this instruction range
consume across the lifetime of the trace?" or "what was the last time we
saw any instruction from this region execute?"

These questions are folds (in the functional-programming sense) or scans
(in the database sense) over an ordered stream of execution intervals.
Concretely, for the cumulative cycle count over an instruction range $R$,
the aggregate I implemented computes

$ C(R) = sum_(r in cal(I), r.text("instruction_range") subset.eq R) r.text("cycle_count"), $

where $cal(I)$ is the set of decoded execution intervals from the
virtual table introduced above. The *last-seen-timestamp* aggregate is
the analogous `max` over `timestamp`. Both are exposed as user-defined
aggregate functions in the SQL surface so that analysts and product
engineers can use them in the same queries they use for any other
counter.

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
  - *Symbolization* — the headline feature of this group, and the
    single largest piece of design work in the internship.
    Symbolization is what turns a decoded ETM packet, which on its
    own says nothing more than "a CPU executed at this opaque address
    at this opaque time", into the exact line of source code the
    core was actually running. Wiring that in required pulling in
    the LLVM symbolizer, which is too heavy to ship in every
    Perfetto build — and that constraint introduced the first real
    architectural schism in Perfetto. Up to this point Perfetto built
    identically on every machine; symbolization changed that, in
    roughly the way a Linux kernel with a particular module loaded
    is structurally different from one without it. Perfetto's SQL
    stdlib gained a `symbolize` function, the
    `_linux_perf_etm_metadata` view exposed file names and relative
    program counters, and the LLVM symbolizer became a first-class
    but *optional* build dependency.
  - *ETM decode* — improvements to the trace-processor side of ETM
    decoding, including a binary-info error fix, the rename of `trace`
    to `chunk` for clarity, the addition of symbolisation to the ETM
    virtual table (joining decoded ETM packets against program info to
    surface the exact source line and instruction each packet was
    tracing), and a fix to a long-standing workaround that affected
    zipped traces.
  - *Aggregation* — last-seen timestamps, cumulative cycle counts, and the
    fixes to make cycle-count joins behave correctly under the new model.
  - *UI and build* — a dedicated ETM *session track* in the Perfetto UI so
    that ETM data is visible alongside the rest of the trace; the
    `llvm-dev` dependency wired into the sandbox CI; and the mutual
    exclusion of the `llvm_symbolizer` and `libcxx` build flags so that
    the two are no longer accidentally combined.
])

In parallel with the code, I delivered several substantial design
documents — the heaviest of which were the ETM trace-processor
extension, the LLVM symbolization integration, and the clock-mapping
framework — and a final presentation to the wider Web Performance
audience in which I fielded questions from senior engineers and tech
leads.
