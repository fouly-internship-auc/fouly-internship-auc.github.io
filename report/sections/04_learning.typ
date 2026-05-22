= What I Learned

Splitting the internship into "what I learned" and "what I shipped" is
artificial — the two grew together — but if I had to name the lessons that
I expect to carry into the rest of my career, they would be these.

== Working in Ambiguity

The first month of the internship was, by some distance, the hardest of
the three. The official ARM documentation for ETM is sparse and assumes
a reader who already knows the hardware; the existing decoder library
documents its public API but not its internal model; the existing usage
of ETM inside Perfetto consisted of a small experimental subset of
features that nobody on the team had touched in months. I spent the
first two weeks deliberately reading the ARM architecture manual at the
pace of the slowest engineer who has ever joined the team — taking
notes on what each ETM packet type was actually saying and writing
small throwaway coding examples to convince myself that I had
understood what I was reading. The reading never really stopped during
the rest of the internship, but those first two weeks were the moment
in which it had to be the primary activity.

Before this internship I had associated "doing well" with "writing a lot
of correct code quickly". The first month forced me to update that. The
single most useful thing I could do for the project, in week two, was to
slow down further and write a design document — not because anyone had
asked, but because the alternative was committing to an architectural
decision I would have to reverse two weeks later. That experience
permanently changed my default behaviour at the start of an unfamiliar
problem.

== The Value of Design Documents

The Perfetto team is unusually rigorous about design documents, and I
came to understand why. A design document is not the same thing as a
specification, and it is not the same thing as documentation. It is a
*written argument* for why one architectural choice should win over the
alternatives. The act of writing it forces you to enumerate the
alternatives in the first place; the act of circulating it forces you to
make the argument legible to someone who is not in your head.

I wrote several substantial design documents during the internship —
the clock-mapping framework was the heaviest, but the cumulative-cycle
aggregate, the diff-test plumbing, and the structural rework around
the `trace`/`chunk` distinction each had their own document long
enough to be argued over by reviewers before any code was committed.
Each of them caught problems that I would otherwise have caught only
in code review, at which point fixing them would have cost an order
of magnitude more time. By the end of the internship I had
internalised the habit: when the next problem arrives I will, by
reflex, open an empty design document before opening an empty file.

== Operating Inside a Very Large Codebase

The Perfetto repository is large. The C++ trace processor alone is on the
order of hundreds of thousands of lines, the build system is bespoke, and
the testing infrastructure is non-trivial. Learning to navigate it — to
read code by ripgrep'ing for symbols, to follow a build target through
its dependencies, to find the right diff test to extend rather than
inventing a new one — was a skill in itself. I had never worked in a
codebase this large before. By the end of the internship, I could open
a new feature request, find the four or five files it would touch, and
sketch a plan in an hour. That was not true on my first day.

== The Cost of Skipping Edge Cases

The supervisor's evaluation letter flags two areas where my performance
could improve, and I want to address them honestly in this report. The
first is that I do not, by default, anticipate edge cases early enough.
I would do well to spend more time at the start of a problem listing
out the failure modes — the empty input, the saturated buffer, the
clock that runs backwards, the trace that is split across files — and
deciding which ones the implementation has to handle versus which ones
the design can rule out. I caught most of these in review, but I want
the next intern's design document to say "we will handle the following
edge cases, and we will explicitly not handle the following others, for
the following reasons" on page one.

== Mathematics at Industrial Scale

The shape of the work surprised me. I had assumed, going in, that the
mathematical content of an applied software role would be modest and
mostly buried under engineering concerns. What I found instead was that
*the engineering decisions that mattered were the ones that had a clean
mathematical structure*. Treating ETM data as a set of relations made it
queryable; treating the clock alignment as an affine map made it
estimable from a small number of synchronisation events; treating the
cycle count as a fold over an ordered stream made it efficient. In each
case the mathematics did not sit on top of the engineering as a layer of
window-dressing — it was the engineering, expressed properly.
