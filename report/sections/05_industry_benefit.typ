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

Before this internship, Perfetto's relationship with ETM was experimental
and incomplete. There was no way to ask a Perfetto trace processor "show
me the cumulative cycles spent in this address range across this trace",
because the underlying data was not exposed as queryable relations. By
the end of the internship there was. The new SQL surface includes the
`symbolize` standard-library function, the `_linux_perf_etm_metadata`
view that exposes file names and relative program counters from a Linux
`perf` trace, the cumulative cycle aggregate, and a last-seen-timestamp
aggregate. Each of those is now available to any engineer at Google or
in the wider open-source community who is investigating a performance
regression with ETM data.

== Tooling and Build Infrastructure

The internship pushed Perfetto's build system in two ways that will
keep paying dividends after I leave.

The first is the introduction of the LLVM symbolizer as a first-class
build dependency. The PR `profiling: symbolizer: adds llvm symbolizer`
and the supporting CI work in `ci: add llvm-dev to sandbox ci` make
it possible for the trace processor to attach source-level symbols to
ETM instruction ranges directly inside SQL queries, instead of forcing
analysts to post-process traces with a separate external symbolizer.

The second is the diff-test framework for ETM behaviours: the
`tp: stdlib: adds symbolize and etm diff tests` and `tp: diff test:
conditional etm package inclusion` PRs added the infrastructure
required to run ETM tests conditionally in environments where the
underlying package is available, which means the next engineer to
touch ETM does not have to rebuild that scaffolding.

== Documentation

The clock-alignment design document is, in some ways, the artefact I
am most proud of from the internship. It captures the framework, the
estimator, and the trade-offs argued out during review carefully
enough that the engineer who picks up the next iteration of the work
will not have to re-derive any of it. Alongside it sit the other
substantial design documents from the internship — for the
cumulative-cycle aggregate, the diff-test plumbing, the ETM session
track in the UI, and the structural decision to rename `trace` to
`chunk` (which removed a name overload that had been quietly confusing
reviewers in the months leading up to the change). Each was a written
argument first and a code change second.

In short: the project came in with eighteen merged changelists,
several substantial design documents and a number of smaller ones, and
a non-trivial amount of cleanup work on the surrounding build, test
and documentation infrastructure. Lalit Maganti, the team's senior trace-processor tech
lead, noted that he considered this project "one of the most
challenging intern projects [he] had ever seen" — a remark that lives
in the evaluation letter — and the fact that it landed in a usable
state, in the public repository, is the most concrete way I can
summarise the contribution.
