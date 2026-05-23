= How the Industry Benefited

Perfetto is an open-source project, which has the convenient consequence
that almost all of the work I did during the internship is visible at a
public URL. The complete list of my landed changes is at

#block(inset: (left: 1em), [
  `github.com/google/perfetto/pulls?q=is:pr+author:OmarElfouly+is:closed`
])

and contains 18 reviewed and merged pull requests. The downstream effect
of those changes on Google and on the wider Perfetto user base falls into
three categories.

== New Capability for the Trace Processor

Before this internship, Perfetto's relationship with ETM was
experimental and incomplete. There was no way to ask a Perfetto trace
processor "show me the cumulative cycles spent in this address range
across this trace", and — more fundamentally — no way to ask "*which
line of source code* was a given CPU core running at a given moment".
By the end of the internship there was. The new SQL surface includes
a `symbolize` standard-library function that maps decoded ETM packets
back to source lines (the architectural negotiation that this
required is described under *Documentation*, below), the
`_linux_perf_etm_metadata` view exposing file names and relative
program counters from a Linux `perf` trace, the cumulative cycle
aggregate, and a last-seen-timestamp aggregate. Each of those is now
available to any engineer at Google or in the wider open-source
community who is investigating a performance regression with ETM
data.

== Tooling and Build Infrastructure

The internship pushed Perfetto's build system in two ways that will
keep paying dividends after I leave.

The first is the introduction of the LLVM symbolizer as a first-class
but *optional* build dependency. The PR `profiling: symbolizer: adds
llvm symbolizer` and the supporting CI work in `ci: add llvm-dev to
sandbox ci` make it possible for the trace processor to attach
source-level symbols to ETM instruction ranges directly inside SQL
queries, instead of forcing analysts to post-process traces with a
separate external symbolizer. This is the first time a Perfetto
build component has been *optional* in this way; the architectural
negotiation that allowed it to be is described in the *Documentation*
sub-section below, and the test-side counterpart — running diff
tests only when their required configuration is present — is
described above.

The second is *conditional diff tests based on configuration* — a
general extension of Perfetto's diff-test framework that lets a given
test declare the build configuration it requires and runs only when
that configuration is actually present on the build machine. PR
`tp: diff_tests: adds optional diff tests based on config` is the
framework change; PRs `tp: diff test: conditional etm package
inclusion` and `tp: stdlib: adds symbolize and etm diff tests` were
the first consumers, gating ETM and LLVM-symbolize tests on the
availability of the underlying packages. The mechanism is general:
any future test in Perfetto with configuration requirements can use
the same plumbing, and the diff-test framework no longer has to
choose between turning a test off globally and accepting the noise
when it fails on a machine that isn't set up for it. The feature
grew out of the design exchange recounted later in this report.

== Documentation

I wrote three substantial design documents during the internship. The
heaviest, in terms of both length and the number of engineers who
ended up reviewing it, was the document that set out the *ETM
extension to the trace processor itself* — the relational schema, the
decoder interface, the lifecycle of the new virtual tables, the
integration points with the rest of Perfetto.

Second — and in retrospect the most architecturally consequential
of the three — was the *symbolization design document*.
Symbolization takes a raw ETM packet, which on its own carries
nothing more than "a CPU executed at this opaque address at this
opaque time", and turns it into the exact line of source code the
core was actually running. Wiring that into Perfetto required pulling
in the LLVM symbolizer — too large, and too license-encumbered, to
ship in every Perfetto build — and that constraint introduced the
first real architectural schism in the trace processor.

Up to this point, Perfetto built identically on every machine: same
sources, same compiler flags, same binary. Symbolization changed
that. A Perfetto build with the LLVM symbolizer present is now
structurally different from one without it, in roughly the way a
Linux kernel compiled with a given set of modules is different from
one compiled without them. The trace processor had to grow a
well-defined boundary at which optional components attach, the SQL
surface had to learn to expose features that are sometimes there and
sometimes not, the build system had to support both configurations
side by side, and the test infrastructure had to grow the
conditional-by-configuration plumbing described above so that
symbolize tests would not just fail on machines without the
dependency.

The design document is the record of that whole negotiation as much
as it is a specification, and the fact that the schism resolved into
a clean module-like separation rather than a leak across the rest of
the engine is, in retrospect, the thing I am proudest of
architecturally.

Third was the *clock-mapping framework* — the artefact I am in some
ways proudest of for different reasons: it captures the affine
model, the synchronisation-event regression that did not ship, and
the register-read approach that did, carefully enough that the
engineer who picks up the next iteration of the alignment work will
not have to re-derive any of it.

Smaller but still load-bearing documents argued out the
cumulative-cycle aggregate, the diff-test plumbing, the ETM session
track in the UI, and the structural decision to rename `trace` to
`chunk` (which removed a name overload that had been quietly
confusing reviewers in the months leading up to the change). Each
was a written argument first and a code change second.

In short: the project came in with eighteen merged changelists, three
substantial design documents and several smaller ones, and a
non-trivial amount of cleanup work on the surrounding build, test and
documentation infrastructure. Lalit Maganti, the team's senior
trace-processor tech lead, noted that he considered this project "one
of the most challenging intern projects [he] had ever seen" — a
remark that lives in the evaluation letter — and the fact that it
landed in a usable state, in the public repository, is the most
concrete way I can summarise the contribution.
