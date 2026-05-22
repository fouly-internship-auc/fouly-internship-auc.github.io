import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function Reflections() {
  return (
    <SlideFrame
      eyebrow="Section 8"
      title="What I would do differently"
      subtitle="The supervisor evaluation flagged two areas honestly. They are worth addressing the same way."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 36, marginTop: 16 }}>
        <Animated as="div" animate="up" delay={200} className="card"
          style={{ borderLeft: '6px solid var(--color-warm)' }}>
          <span className="card__tag" style={{ color: 'var(--color-warm)' }}>
            Anticipate edge cases earlier
          </span>
          <div className="card__title" style={{ fontSize: 30 }}>
            Failure modes belong on page one
          </div>
          <div className="card__sub" style={{ fontSize: 22, lineHeight: 1.45 }}>
            Default for my design documents will be a required failure-modes
            section <em>before</em> the happy-path description. Empty inputs,
            saturated buffers, clocks running backwards, partial traces.
          </div>
        </Animated>

        <Animated as="div" animate="up" delay={380} className="card"
          style={{ borderLeft: '6px solid var(--color-warm)' }}>
          <span className="card__tag" style={{ color: 'var(--color-warm)' }}>
            Architecture before code
          </span>
          <div className="card__title" style={{ fontSize: 30 }}>
            Push the design phase further back
          </div>
          <div className="card__sub" style={{ fontSize: 22, lineHeight: 1.45 }}>
            The work that needed the most revision was, almost without
            exception, work where I started by writing code and backed out a
            design afterwards. Reversed, that cost is paid by code that has
            not been written yet.
          </div>
        </Animated>
      </div>

      <Animated as="div" animate="fade" delay={650}
        className="callout callout--warm" style={{ marginTop: 28 }}>
        Both lessons are the same lesson in different costumes: <em>specify
        before you implement, even when you do not have to.</em>
      </Animated>
    </SlideFrame>
  );
}
