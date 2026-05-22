= Interactions with the Supervisor and the Team

== Supervisor

I met one-on-one with Rasika roughly twice a week throughout the
internship. Early on those meetings were unusually long, because I was
still trying to triangulate what the team actually wanted me to build
out of a project description that, by design, left much of the
architecture open. As the project shape stabilised the meetings shrank
to the more typical fifteen-minute check-in, with longer meetings only
when I had a design document on the table or when a code review had
surfaced something architectural.

The thing I valued most about how Rasika ran those check-ins was that
she insisted on me coming with a concrete *option set* rather than an
open question. If I was stuck on a design choice, the expectation was
not "tell me what to do" but "here are the two or three approaches I
have considered and what I see as the trade-offs of each". That habit
forced me to do the framing work myself before I asked for a decision,
and it is a habit that I think will outlast the internship.

== The Wider Team

The Perfetto team is geographically spread, and so was my collaboration.
On the trace-processor side I worked closely with a senior technical
lead who acted as my main code reviewer for the relational-algebra work.
He was based in a different office and a different time zone, which
meant most of our exchanges were asynchronous, in the form of review
comments and the long e-mail threads that come with non-trivial design
documents. The asynchronous style was new to me; I learned, more or
less the hard way, how to *write a comment that resolves a question
rather than starting a new one*.

I also spent a non-trivial amount of time with engineers outside the
immediate team. Adding the LLVM symbolizer as a build dependency, for
example, required a conversation with the team that owns Perfetto's
build infrastructure; the ETM session track in the UI required a
conversation with the front-end engineers; the diff-test changes
required a sign-off from the testing-infrastructure owner. Setting up
those conversations, presenting the work clearly enough that the other
team understood what I was asking for, and writing the resulting
agreement down was, in retrospect, as much of the job as writing the
code itself.

== Culture

The two things I would highlight about how Google internally works,
based on this internship, are the *code-review culture* and the *design-
document culture*. Code reviews are not a rubber stamp; non-trivial
changes routinely went through three or four rounds of detailed
comments, sometimes more. That is a much slower model than the
move-fast culture I was used to from coursework and from open-source
contributions, and it took a few weeks to recalibrate. By the end of
the internship I had come to genuinely prefer it: the rate at which
work landed was slower, but the rate at which work *stayed landed*
without follow-up reverts was much higher.

The design-document culture is the complement of that. Most of the
significant decisions in the project were settled in writing, in a
document circulated for comments, before any code was written. The
experience of being inside the culture rather than outside it gave me a
much better sense of *why* it works: it externalises decisions that
would otherwise live, brittle and undocumented, inside the heads of the
engineers who made them.
