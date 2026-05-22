= Suggestions for the AUC Mathematics Program

I want to be careful here: I am one intern, with one industry experience,
and a curriculum is a much larger object than any single internship can
inform. The suggestions below are offered in that spirit. They are the
places where I felt the gap between what I had been taught and what the
work needed.

== Add an Applied / Computational Mathematics Track

The single course I would have wanted on my transcript before walking
into the Perfetto team is one that I would describe as *applied and
computational mathematics*: a course that takes the abstractions of
linear algebra, analysis and discrete mathematics and asks how they are
realised on real hardware, in real software, against real data.
Numerical conditioning, the cost of operations, the way an algorithm
degrades under finite precision — these are mathematical questions, but
they are usually not taught inside a pure mathematics course at AUC. A
dedicated applied track would close that gap for students whose careers
will take them outside academia.

== Optimisation

A formal optimisation course — convex optimisation, linear programming,
the basics of non-linear optimisation and the duality theory connecting
them — would have helped me at several points during the internship,
particularly when reasoning about the cost models of relational joins
and when arguing for one estimator over another for the clock-alignment
fit. AUC has very strong probability and analysis offerings; an
optimisation course taught at the same standard would round out that
foundation.

== Formal Verification and Specification

The habit of *writing a specification before writing code* is something I
acquired on the job, not in the classroom, and I think it would have been
much easier to acquire if formal verification had been a course I had
taken. A semester spent writing pre- and post-conditions, reasoning about
loop invariants and using a tool like a proof assistant to enforce them
would have given me the habit of stating what a program is *supposed to
do* before deciding how it should do it. That habit is what design
documents are an industrial-grade version of.

== Complexity Analysis as a Mathematical Subject

The complexity analysis I have studied at AUC has tended to live inside
algorithms courses, where it is treated as a tool. A dedicated course
that treats complexity classes, reductions and the structural relations
between problems as a mathematical subject in its own right would, in my
view, sit very naturally in the mathematics department's curriculum and
would give graduates of the programme a much sharper intuition about
which problems are tractable and which are not.

== Earlier Programming Exposure, Taught Through a Mathematics Lens

Finally, I would suggest exposing mathematics majors to programming
earlier in the degree, and explicitly *through a mathematics lens*.
Programming for mathematicians is not the same subject as programming
for computer scientists: the natural examples are different, the natural
abstractions are different, and the path of least resistance for someone
who already thinks in mathematical structures is to be taught the
programming idioms that mirror those structures. A first programming
course built around symbolic algebra, finite-set manipulation and proof
checking would teach the same operational skill, in a way that is more
likely to take.

I want to close this section by emphasising what the programme *did* get
right. The courses I leaned on most during this internship — discrete
mathematics, linear algebra, graph theory, probability and statistics —
were taught at a standard high enough that I was able to walk into a
conversation about relational algebra, affine fitting and graph
reachability at a senior-engineer table and contribute meaningfully. The
suggestions above are about extending that foundation, not replacing it.
