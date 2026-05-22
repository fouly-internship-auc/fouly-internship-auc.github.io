= Response to the Supervisor's Evaluation

Rasika Navarange's evaluation letter is attached to this report as
`appendix/evaluation_letter.pdf`. The full text speaks for itself and I
will not paraphrase it here. What I do want to do, in keeping with the
spirit of the guidelines — an *evaluative*, rather than a recommendation,
letter — is to address the two improvement areas the letter flags,
honestly.

== Anticipating Edge Cases

The first observation is that I tend to react well when edge cases
arise but do not anticipate them aggressively enough at the design
stage. I think this is correct. When I look back at the design
documents I wrote during the internship, almost all of them describe
the *happy path* of the system in great detail, with the failure modes
addressed as a short section near the end. The right structure, I
suspect, is closer to the inverse: the happy path is usually the easy
part, and the document is at its most useful when it forces an explicit
decision about *each* failure mode early.

Concretely, the change I plan to make is procedural. Going forward,
before I open a design document, I will write a short list of failure
modes — the empty input, the saturated buffer, the input that violates
an assumed invariant, the unsupported configuration — and I will treat
that list as a required section of the document. That changes the
default from "consider edge cases when something goes wrong" to
"enumerate edge cases as part of the design phase".

== A Brief Diversion in Defence of Anticipating Edge Cases

I want to attach a small story to this. The internship culminates in a
final demo to the team. I had prepared, I had rehearsed, I had done a
clean run-through with my supervisor the day before. The live demo
froze anyway — first time it had done that — in front of the senior
engineers I had been working with for three months. The same trace,
the same machine, the same UI that had behaved perfectly an hour
earlier locked up live, and the failure turned out to trace back to
an edge case I had simply not enumerated ahead of time.

What makes the story relevant to this report rather than just
embarrassing is the room's reaction. Demo freezes, the implicit
assumption seemed to be, are a normal part of the work, and the
interesting question is what you do next. Nobody flinched; the
conversation moved on; I learned what I needed to fix from the
debugging that followed.

It is the cleanest argument I have, in my own experience, for the
"anticipate edge cases earlier" feedback. Even after preparation, even
after a successful rehearsal, the case I had not written down on a
failure-modes list ahead of time was the one that fired live. Going
forward, the failure-modes section of every design document will be
where I start, not where I finish.

== Initial Architectural Choices

The second observation is that some of my initial implementations
required several revisions before they were merged, because the initial
architectural design needed refinement. This is also fair. The work I
am proudest of in the internship — the cumulative cycle aggregate, the
last-seen-timestamp aggregate, the diff-test framework — is work where
I wrote the design document first and then implemented against it. The
work that needed the most revision was, almost without exception, work
where I started by writing code and then tried to back out a design
from what I had written.

The lesson is the same lesson as the one above, in a different costume:
the cost of architectural revision is paid by code that has already
been written, while the cost of writing the design document well is
paid by code that has not been written yet. Going forward I want to
push that boundary as far back into the design phase as I can.

== A Brief Word of Thanks

I want to close this section by thanking Rasika directly. The evaluation
letter is generous, but more importantly it is *specific*: it names what
worked, names what could be better, and treats both as deserving of the
same kind of careful attention. That is the same standard she held me
to throughout the internship, and the version of me that returns to
Google will be a noticeably better engineer because of it.
