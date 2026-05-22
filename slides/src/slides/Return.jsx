import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function Return() {
  return (
    <SlideFrame
      eyebrow="Section 9"
      title="Would I work there again?"
      subtitle="The guideline asks the question; the contract has already answered it."
    >
      <div style={{ display: 'flex', gap: 80, marginTop: 20, alignItems: 'stretch' }}>
        <Animated as="div" animate="pop" delay={150}
          style={{
            flex: '0 0 360px', display: 'flex',
            flexDirection: 'column', justifyContent: 'center',
          }}>
          <div className="stat">
            <div className="stat__value" style={{
              fontSize: 200, lineHeight: 0.9, color: 'var(--color-good)' }}>
              Yes.
            </div>
            <div className="stat__label" style={{ marginTop: 22 }}>
              Return offer signed.
            </div>
          </div>
        </Animated>

        <Animated as="div" animate="up" delay={350}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 26, lineHeight: 1.5, color: 'var(--color-ink)' }}>
            Three reasons, in roughly the order they mattered:
          </div>
          <ul className="bullets" style={{ fontSize: 26 }}>
            <li><strong>The work itself.</strong> ETM in Perfetto was an
              unusually challenging intern project. The full-time role opens
              onto a similar problem space with more responsibility.</li>
            <li><strong>The people.</strong> The technical standard set by
              the engineers I worked with is the standard I want to keep
              being measured against.</li>
            <li><strong>The style of work.</strong> Rigorous review,
              written design culture, and the expectation that the
              mathematical structure of a problem is allowed to drive the
              engineering.</li>
          </ul>
        </Animated>
      </div>
    </SlideFrame>
  );
}
