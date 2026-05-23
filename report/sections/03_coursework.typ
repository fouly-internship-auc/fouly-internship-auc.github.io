= Cumulative Coursework Used During the Internship

The internship was a SWE internship in title, but in practice it was a
mathematical one in everything but name. Two of the three core technical
challenges — relational algebra over ETM data and the affine alignment of
two clocks — were essentially mathematics problems with a software harness
around them. The courses that I leaned on most were therefore the
mathematics and logic courses I had taken, with a few computer-science
courses providing the operational language for the work.

== Mathematics Courses

*Discrete Mathematics and Formal Logic.* The most load-bearing course
for the internship. Sets, relations and predicate logic are the
substrate on which the trace processor's SQL surface is built, and
having that substrate fluent — not just operationally but
*specification-first* — made the difference between writing a query
that worked on the small case and one that would survive an analyst
pointing it at three hundred million rows. Predicate logic in
particular shaped how I argued about query semantics in code review:
quantifier scope, existential subqueries, the behaviour of joins
under `NULL`s. Formal logic taught me the habit of stating what a
query is *supposed to compute* in symbols before reaching for code —
a habit that paid off every time a subtle re-phrasing changed the
engine's query plan by an order of magnitude.

*Linear Algebra.* The clock-alignment work is, at its heart, a one-
dimensional affine fitting problem: given pairs $(t_("etm")^{(i)},
t_("sys")^{(i)})$ for synchronisation events $i = 1, dots, n$, the
question is how to recover $alpha$ and $beta$ so that $alpha dot
t_("etm")^{(i)} + beta approx t_("sys")^{(i)}$ across all of them.
The habit of treating that as a linear-least-squares problem and
reasoning about conditioning, residuals and the geometry of the
estimator came directly from linear algebra. The implementation that
shipped deliberately stops short of computing the fit and leaves it
to a human reading the UI plot, but the design document discusses the
more general estimator in terms that would have been impossible to
phrase carefully without the linear-algebra background.

*Graph Theory.* ETM traces are easiest to interpret in terms of the
*control-flow graph* of the program being traced. Each basic block is a
node; each possible jump is an edge; an instruction trace is a walk in
that graph. Several of my changes — particularly around symbolisation and
the way decoded packets are stitched into ranges of executed
instructions — were essentially graph-reachability arguments. Graph theory
gave me the language for those arguments and for explaining them in design
documents.

*Probability and Statistics.* Probability and statistics played a quieter
role but a real one. Whenever I needed to sanity-check whether an ETM
trace was "good enough" — whether the synchronisation events were
distributed densely enough across the trace to support an affine fit,
whether the cycle-count totals were within an expected envelope of the
hardware performance counters — I was thinking statistically. The
distinction between systematic error and random noise that probability
courses train into you is exactly the distinction I needed to draw to tell
whether a divergence between two counters was a bug or an artefact.

== Adjacent Computer Science Courses

The mathematics courses gave me the lens; a few computer-science courses
gave me the implementation vocabulary I needed in order to operate inside
a large open-source codebase.

*Algorithms and Data Structures* was the course that turned the
relational-query-cost work from intuition into vocabulary. Interval
trees, sorted-merge joins, hash joins, and the asymptotic arguments
that decide between them are not abstract objects for someone who
has had to argue about them in a course assignment, and that
grounding came back on every design review for the cycle-count join
work — usually as the answer to "why will this be fast on a hundred
million rows".

*Databases* was the course that turned out to overlap almost perfectly
with the day-to-day work. Perfetto's trace processor is a database
engine — specialised to performance traces, tuned hard for very tall
relations, but a database engine nonetheless — and a large fraction
of the design discussions I participated in could have been
transposed directly into a databases-course problem set on cost
models and query planning.

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
