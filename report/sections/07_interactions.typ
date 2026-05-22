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

A small but representative example: on the cumulative-cycles PR
(\#2643), Rasika asked, during review, whether the design accounted
for the case of two `SYNC_MARKER` packets followed by two `TIMESTAMP`
packets, and what would happen if a `SYNC_MARKER` was the last marker
in the trace. Those were exactly the sort of edge cases the evaluation
letter would later flag me on for not anticipating in advance — and
once she asked, I could enumerate them, but the asking is what surfaced
them. After a few rounds of that pattern, I started writing the edge
cases down for her before she had to ask. That is what mentorship at
this end of the seniority gap looks like in practice.

== The Wider Team

The Perfetto team is geographically spread across several offices,
though much of the trace-processor leadership sits in London with me.
On that side of the codebase I worked closely with Lalit Maganti, a
senior technical lead who acted as my main code reviewer for the
relational-algebra work, and on the UI and front-end side I worked
with engineers based in offices I never visited. Even with Lalit in
the same city, most of our exchanges were textual: review comments,
design documents and PR threads rather than meetings. The written-
asynchronous style was new to me; I learned, more or less the hard
way, how to *write a comment that resolves a question rather than
starting a new one*.

There are two exchanges that capture what working with this team
actually felt like better than any abstract description I could write.
Both involve a PR thread, an unreasonable timestamp, and a reply
faster than is strictly polite.

The first happened on the evening of Friday the 1#super[st] of August.
I was stuck on PR \#2375 — my standard-library `symbolize` function
depended on a build flag, `enable_perfetto_llvm_symbolizer`, that was
not set on the test machine, which meant the diff tests refused to
run. I left a comment on the PR explaining the problem and tentatively
suggesting we disable the symbolize tests when the flag was off. The
timestamp on that comment is `17:46` UTC. Lalit's reply landed at
`17:49`. *Three minutes later.* He said, in effect: forget disabling
the tests, this is the moment to add proper configuration-aware
plumbing to the diff-test framework, because "honestly it's high time
we have this anyway, it's something we've been lacking for a
looooongggg time." Two minutes after that, I pushed a follow-up
commit. An hour later I opened the follow-up PR (\#2382) that would
introduce the plumbing he had asked for. By `19:23` UTC, an hour and a
half after my original question, the rename was in, the dependency
chain was clean, and I had marked the discussion done with a "Done
:)". At no point in that ninety-minute window did the gap between
his comments and my pushes stretch past about three minutes.

The second happened a week later, and it is the one that has stuck
with me. Late on Friday the 8#super[th] of August — `22:40` UTC,
just past half-eleven at night in London — an engineer on the
*Chrome* team, a different product entirely, posted on the issue
that had come out of the first exchange. My changes had broken his
team's diff-test run, because Chrome builds with
`enable_perfetto_etm_importer = false` and the stdlib was including
`etm.sql` unconditionally. He had tried to fix it with a GN
conditional and hit a separate, more confusing problem: the
conditional was silently ignored by the generated Android.bp and
BUILD files. Lalit's reply landed at `22:41`. *One minute later.*
A single sentence: "This won't break non-GN builds. It's WAI that
those builds don't have etm code."

It was nearly midnight on a Friday in London, and the question on the
table was a real downstream breakage in a sister product. Three people
were active in two different repos in the same hour: the Chrome
engineer raising the bug, Lalit answering it in one minute, and me
pushing a commit to a related ETM PR at `23:29` UTC — twelve thirty
on a Saturday morning, my time — and then leaving a comment on the
diff-test PR at `00:45`. I had not been planning to work that night.
None of us had. The conversation pulled three people out of their
weekends into the same fifteen-minute window, and it was over before
any of us had really committed to staying up for it.

The pacing of those exchanges — *minutes*, across teams, at
unreasonable hours, on weekends — is the thing I find hardest to
convey to someone who has not seen it. It is also one of the reasons
I came away respecting the seniority of the engineers on the team
more than I have respected anyone else I have worked with.

I also spent a non-trivial amount of time with engineers outside the
immediate team. Adding the LLVM symbolizer as a build dependency
required a conversation with the team that owns Perfetto's build
infrastructure; the ETM session track in the UI required a conversation
with the front-end engineers; the diff-test changes required a sign-off
from the testing-infrastructure owner. Setting up those conversations,
presenting the work clearly enough that the other team understood what
I was asking for, and writing the resulting agreement down was, in
retrospect, as much of the job as writing the code itself.

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
