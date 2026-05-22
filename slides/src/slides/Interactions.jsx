import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function Interactions() {
  return (
    <SlideFrame eyebrow="Section 7"
      title="Working with the team"
      subtitle="Two cultural things stood out: code review and design docs.">
      <div className="grid-cards grid-cards--2" style={{ marginTop: 24 }}>
        <Animated as="div" animate="up" delay={150} className="card">
          <span className="card__tag">Code review</span>
          <div className="card__title">Slower to land, slower to revert.</div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            Non-trivial changes routinely went through three or four rounds
            of detailed comments. I came to genuinely prefer it.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={320} className="card">
          <span className="card__tag">Design docs</span>
          <div className="card__title">Argument before implementation.</div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            A design document is a written argument for why one
            architectural choice should win. The act of writing it forces
            you to enumerate the alternatives.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={490} className="card">
          <span className="card__tag">1:1s</span>
          <div className="card__title">Bring an option set, not a question.</div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            The expectation was &ldquo;here are two or three approaches and
            their trade-offs&rdquo; — not &ldquo;tell me what to do&rdquo;.
            That habit will outlast the internship.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={660} className="card">
          <span className="card__tag">Cross-team</span>
          <div className="card__title">Build, UI, testing — all separate teams.</div>
          <div className="card__sub" style={{ fontSize: 22 }}>
            LLVM dep, ETM session track, diff-test scaffolding — each one
            required a conversation outside the immediate team.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
