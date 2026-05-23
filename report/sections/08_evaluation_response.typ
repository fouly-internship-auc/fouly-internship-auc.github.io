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

I want to close this section by thanking the three engineers whose
mentorship made the internship what it was.

*Rasika Navarange*, my host, wrote the evaluation letter and ran the
project relationship. The letter is generous, but more importantly it
is *specific*: it names what worked, names what could be better, and
treats both as deserving of the same kind of careful attention. That
is the same standard she held me to throughout the internship.

*Anna Mayzner*, my co-host, was the engineer I leaned on for the
broader Perfetto context that the project never quite stopped
needing — design conventions, the shape of the testing infrastructure,
which paths through the codebase were load-bearing and which were
historical. Her experience, reviews, and patient teaching ran
underneath most of the Perfetto-side work, and the diff-test plumbing
in particular would not exist in its current shape without her.

*Lalit Maganti*, a senior engineer on the Perfetto team, was the
subject-matter expert I went to when a question genuinely needed an
authoritative answer. Several of the anecdotes earlier in this report
involve him directly; a great deal of what I learned about how to
argue for a design decision in writing came out of trying, and
frequently failing, to argue one past him.

The version of me that returns to Google will be a noticeably better
engineer because of all three.
