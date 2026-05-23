= Cumulative Coursework Used During the Internship

The internship was a SWE internship in title, but like almost everything in life, it had a mathematical core. Two of the three main technical
challenges — relational algebra over ETM data and the affine alignment of
two clocks — were essentially mathematics problems with a software wrapper (kind of redundant since all of computer science can be descriped as software preforming mathematics). The courses that I leaned on most were therefore the
mathematics and logic courses I had taken, with computer science
courses providing the language and tools for the work.

== Mathematics Courses

*Discrete Mathematics and Formal Logic.* The most load-bearing course
for the internship. Sets, relations and logic are the
substrate on which the trace processor's SQL surface is built, and
having that substrate fluent — not just operationally but
*specification-first* — made the difference between writing a query
that worked on the small case and one that would survive an 
an actual query over hundreds of millions of rows. Predicate logic in
particular shaped how I argued about query semantics in code review:
quantifier scope, existential subqueries, the behaviour of joins
under `NULL`s. Formal logic taught me the habit of stating what a
query is *supposed to compute* in symbols before reaching for code —
a habit that paid off every time a subtle re-phrasing changed the
engine's query plan by an order of magnitude.

*Linear Algebra.* The clock-alignment work is a one-
dimensional affine map: given a system clock $t_("sys")$ and an ETM
clock $t_("etm")$, recover the pair $(alpha, beta)$ such that
$alpha dot t_("etm") + beta approx t_("sys")$. Most of the linear-
algebra mileage in the internship was spent on the path *not* taken:
the design document's earlier iterations treated this as a fitting
problem against synchronisation events, and a real linear-algebraist's
habit of reasoning about conditioning, residuals and the geometry of
an estimator was the right way to argue about whether that approach
would be stable. The shipped solution reads the parameters directly
out of a device register, so the fitting machinery never ran; but the conversation that led to the simpler answer would
not have been possible without it.

*Graph Theory.* ETM traces are easiest to interpret in terms of the
*control-flow graph* of the program being traced. Each basic block is a
node; each possible jump is an edge; an instruction trace is a walk in
that graph. Several of my changes — particularly around symbolisation and
the way decoded packets are stitched into ranges of executed
instructions — were essentially graph-reachability arguments. Graph theory
gave me the language for those arguments and for explaining them in design
documents.

*Probability and Statistics.* Probability and statistics earned their
keep on the ETM data itself. The whole point of recording an ETM
trace is to understand the *distribution* of what a CPU actually
did — how often a given branch was taken versus not, where on the
trace a particular event class concentrated, how the rate of one
event class varied conditional on another. A real fraction of the
analyses I built or extended over the internship were counting and
binning exercises on top of hundreds of millions of decoded packets:
empirical distributions over branch-not-taken events, event rates at
various points of execution, ratios of cycles spent in one address
range against another. 

== Computer Science Courses

The mathematics courses gave me the lens; a few computer-science courses
gave me the implementation skills I needed in order to implement my changes.

*Algorithms and Data Structures* was the course that gave me the
discipline of asymptotic reasoning and the vocabulary for choosing
between data structures and algorithms by their cost profile rather
than by familiarity. Once I started writing C++ inside Perfetto's
trace processor, that habit was the difference between an inner loop
that shipped and one that came back at review with a worse big-O
than the function it was replacing. Most of the implementation-level
choices on the ETM decoder and the cycle-count machinery — which
container, which traversal order, which guard against pathological
input — came out of that course.

*Databases* was the course that turned out to overlap almost
perfectly with the day-to-day work, and it is the course that owns
the relational-query-cost lens from earlier in the report. Perfetto's
trace processor is a database engine — specialised to performance
traces, tuned hard for very tall relations, but a database engine
nonetheless. The specific join algorithms the engine reaches for
(sorted-merge against hash against the interval-aware
specialisations), how predicates push through them, where
intermediate relations get materialised, and what the row counts
look like at each stage: every one of those conversations could have
been transposed directly into a databases-course problem set on cost
models and query planning. The "why will this be fast on a hundred
million rows" question that came up in every cycle-count join review
was, in the end, a databases question.

*Computer Architecture* was the course that let me read the ARM ETM
specification without feeling lost. Concepts like instruction pipelines,
performance monitoring units, hardware counters and out-of-order execution
were already familiar enough from coursework that the ETM-specific details
felt like specialisation rather than first contact.

== Where the Practical Knowledge Came From

It is worth being honest that no single course at AUC taught me how to
read an ARM architecture manual or how to operate inside a multi-million
line C++ and TypeScript codebase. Those skills I picked up on the job,
through reading code and writing design documents. What the coursework
did give me was the *abstractions* — relational algebra, affine maps,
graph reachability, statistical envelopes — and the *vocabulary* I needed
to argue for one design over another with engineers who were a decade my
senior. Without those abstractions the internship would have been a much
shorter and much less rewarding experience.
