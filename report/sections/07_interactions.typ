= Interactions with the Supervisor and the Team

== Supervisor and Co-Host

My contact cadence with Rasika and Anna was deliberately flexible
rather than calendar-driven: a regular weekly slot anchored the
relationship, but the substantive conversations happened ad hoc, on
the days when there was something concrete to discuss — a new design
document, a stuck code review, an architectural decision that needed
a tie-breaker. Early in the internship those conversations were
unusually long, because I was still learning and had an abundance of questions to ask and designs to discuss. As the project shape, and my understanding,
stabilised the meetings became check-ins, with longer ones only when I had a design document on the
table or when a code review had surfaced something architectural.

I really appreciated to format of these check-ins as they always involved a non work section that just checked in on how I was doing with living in a new country and if anything upsetting or fun had happened recently. There was also a lot of prompting for introspection and constant oppertunities for feedback and improvement which was essential for my growth and learning.

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

On that Perfetto side of the codebase I often worked with Anna (my co-host) and Lalit (a senior engineer who frequently acted as my main code reviewer). Conversations with very busy engineers actually helped show me the importance of being concise and clear in order to save the very valuable time of those whose help and opnion I need.

Furthermore, just seeing how experienced engineers aproached problems and design questions was really benificial. The ability of Rasika, Anna, and Lalit to switch contexts rapidly between different tasks was incredibly impressive and a skill I hope to aquire.

There are two exchanges that capture some of the unique experiences I had. 

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

The pacing of those exchanges — *minutes*, across teams
, on weekends — is the thing I find hardest to
convey to someone who has not seen it. It is also one of the reasons
I came away respecting the seniority of the engineers I met. 

I also spent a non-trivial amount of time with engineers outside my
immediate point-of-contact set. Adding the LLVM symbolizer as a build
dependency required a conversation with Perfetto's
lead engineers; the ETM session track in the UI required a
conversation with the front-end engineers; the diff-test work was
done in close collaboration with my co-host Anna, who had rewritten much
of the diff-test infrastructure and was the natural sign-off on any
plumbing changes that touched it. Setting up those conversations,
presenting the work clearly, and writing the resulting agreement down was,
in retrospect, as much of the job as writing the code itself.

== Culture

The two things I would highlight about how Google internally works,
based on this internship, are the *code-review culture* and the *design-
document culture*. Code reviews are not a rubber stamp; the depth of
review varied widely from PR to PR — a small refactor sometimes
landed after a single round of comments, while a structural change
could go through many — but the implicit norm was always that the
review continued until reviewer and author had genuinely converged.
That is a much slower model than the move-fast culture I was used to
from coursework and it took a few
weeks to recalibrate. By the end of the internship I had come to
genuinely prefer it: the rate at which work landed was slower, but
the rate at which work *stayed landed* without follow-up reverts was much higher.

The design-document culture is the complement of that. Most of the
significant decisions in the project were settled in writing, in a
document circulated for comments, before any code was written. The
experience of being inside the culture rather than outside it gave me a
much better sense of *why* it works: it externalises decisions that
would otherwise live, brittle and undocumented, inside the heads of the
engineers who made them.

A small final detail belongs in this section, because it captures the
team's tone more economically than any abstract description can. The
internship ended with a final demo to the wider Web Performance and
Perfetto audience — senior engineers, junior engineers, engineers
from adjacent teams, and the other interns. The demo itself had been
rehearsed, the same workstation had been working perfectly twenty
minutes earlier — and then, in the way these things sometimes go, the
cloud dev machine I was running the demo from chose that exact moment
to freeze. There was nothing in my code that caused it; the VM simply
stopped responding. What was telling was the room's reaction. No-one
flinched. Someone made the standard joke about the demo gods. 
