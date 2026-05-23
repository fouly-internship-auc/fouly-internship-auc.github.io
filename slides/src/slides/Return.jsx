import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function Return() {
  return (
    <SlideFrame
      eyebrow="Section 9"
      title="Would I work there again?"
      subtitle="Contract signed; team and project not yet assigned. The decision was about the company, not a particular role."
    >
      <div style={{ display: 'flex', gap: 64, marginTop: 12, alignItems: 'stretch' }}>
        <Animated as="div" animate="pop" delay={150}
          style={{
            flex: '0 0 320px', display: 'flex',
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
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 24, lineHeight: 1.5, color: 'var(--color-ink)' }}>
            Four reasons, in roughly the order they mattered:
          </div>
          <ul className="bullets" style={{ fontSize: 22 }}>
            <li><strong>The style of work and the rigour.</strong> Code
              review, design docs, and the expectation that the structure
              of a problem drives the engineering.</li>
            <li><strong>Opportunities to learn.</strong> ARM, LLVM, an
              SQL engine tuned for tall tables, a clock-alignment design
              from both ends — all in three months. I expect the rate
              to stay high.</li>
            <li><strong>Environment and culture.</strong> Patience,
              generosity, seriousness. A standard I want to keep being
              measured against.</li>
            <li><strong>London and the offer itself.</strong> The city
              and the compensation are real parts of the decision.</li>
          </ul>
          <div style={{
            fontSize: 18, lineHeight: 1.45, color: 'var(--color-ink-muted)',
            fontStyle: 'italic', marginTop: 4,
          }}>
            Graduate study sponsored by Google is on the table for the
            medium term, contingent on conversations I still need to have
            with people who have walked that path before me.
          </div>
        </Animated>
      </div>
    </SlideFrame>
  );
}
