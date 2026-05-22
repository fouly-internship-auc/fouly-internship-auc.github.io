import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function Interactions() {
  return (
    <SlideFrame eyebrow="Section 7"
      title="Working with the team"
      subtitle="Code review and design docs were the two cultural pillars. The anecdote on the next slide makes the point better than I can.">
      <div className="grid-cards grid-cards--3" style={{ marginTop: 30 }}>
        <Animated as="div" animate="up" delay={150} className="card">
          <span className="card__tag">Code review</span>
          <div className="card__title">Slower to land, slower to revert.</div>
          <div className="card__sub" style={{ fontSize: 21 }}>
            Three or four rounds of detailed comments was normal. I came to
            genuinely prefer it.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={320} className="card">
          <span className="card__tag">Design docs</span>
          <div className="card__title">Argument before implementation.</div>
          <div className="card__sub" style={{ fontSize: 21 }}>
            A written argument for why one architectural choice should win.
            The act of writing it forces you to enumerate the alternatives.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={490} className="card">
          <span className="card__tag">1:1s</span>
          <div className="card__title">Option set, not open question.</div>
          <div className="card__sub" style={{ fontSize: 21 }}>
            &ldquo;Two or three approaches, with their trade-offs&rdquo;
            &mdash; not &ldquo;tell me what to do&rdquo;.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
