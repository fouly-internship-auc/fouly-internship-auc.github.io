= What I Learned

Splitting the internship into "what I learned" and "what I shipped" is
artificial — the two grew together — but if I had to name the lessons that
I expect to carry into the rest of my career, they would be these.

== Working in Ambiguity

The above phrase was something that defined the work done by my team - the job was to constantly hunt for unkown preformance issues and fix them.

The first month of the internship was, the hardest of
the three. The official ARM documentation for ETM is sparse and assumes
a reader who already knows the hardware; the existing decoder library
documents its public API but not its internal model; the existing usage
of ETM inside Perfetto consisted of a small experimental subset of
features developed by someone no longer on the team. Thankfully, my host and co-host were amazing enough to help me catch up on everything I need to know and give me a smooth plan to follow. My only issue was that it felt that I was making no evidence of work while I spent the
first two weeks reading the ARM architecture manual  — taking notes on what each ETM packet type was actually saying and writing
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

The Perfetto team is rigorous about design choices (and by extension documents), and I
came to understand why. A design document is not the same thing as a
specification, and it is not the same thing as documentation. It is a
*written argument* for why one architectural choice should win over the
alternatives. The act of writing it forces you to enumerate the
alternatives in the first place; the act of circulating it forces you to
make the argument legible to someone who is not in your head. Ofcourse, circulating it also allows much more experiend engineers to offer their very useful input which often reveals much simpler solutions.

I wrote several design documents during the internship — the document for adding the ETM extension was the heaviest, followed by sybomlization using LLVM, and then
the clock-mapping framework, but the cumulative-cycle
aggregate, the diff-test plumbing, and the structural rework around
the `trace`/`chunk` distinction each had their own document long
enough to be argued over by reviewers before any code was committed.
Each of them caught problems that I would otherwise have caught only
in code review, at which point fixing them would have might have meant throwing away the code and tests I had implemented.

== Operating Inside a Very Large Codebase

The Perfetto repository is large. The C++ trace processor alone is on
the order of hundreds of thousands of lines, the build system is
bespoke, and the testing infrastructure is non-trivial. Learning to
navigate it — to read code by ripgrep'ing for symbols, to follow a
build target through its dependencies, to find the right diff test to
extend rather than inventing a new one — was a skill in itself. I had
never worked in a codebase this large before. By the last few weeks
of the internship I was answering new feature questions in the
codebase more or less the way I answer questions about my own code
now; on day one, I could barely find the directory.

== Mathematics at Industrial Scale

The shape of the work surprised me. I had assumed, going in, that the
mathematical content of an applied software role would be modest and
mostly buried under engineering concerns. What I found instead was
that *the engineering decisions that mattered were the ones that had
a clean mathematical structure*. Treating ETM data as a set of
relations made it queryable; recognising the clock alignment as a
one-dimensional affine map made it cheap to resolve once we noticed
the hardware was already reporting both parameters; treating the
cycle count as a fold over an ordered stream made it efficient. In
each case the mathematics did not sit on top of the engineering as a
layer of window-dressing — it was the engineering, expressed properly.
