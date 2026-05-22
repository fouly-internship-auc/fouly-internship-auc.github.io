import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function TeamAndProduct() {
  return (
    <SlideFrame
      eyebrow="The team"
      title="Web Performance · Perfetto"
      subtitle="Open-source performance instrumentation and trace analysis. The tool Android, Chrome and server engineers reach for when nanoseconds matter."
    >
      <div className="grid-cards grid-cards--4" style={{ marginTop: 16 }}>
        <Animated as="div" animate="up" delay={150} className="card">
          <span className="card__tag">Where</span>
          <div className="card__title" style={{ fontSize: 24 }}>Google UK</div>
          <div className="card__sub" style={{ fontSize: 18 }}>
            Belgrave House, London SW1W 9TQ.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={280} className="card">
          <span className="card__tag">Host</span>
          <div className="card__title" style={{ fontSize: 24 }}>Rasika Navarange</div>
          <div className="card__sub" style={{ fontSize: 18 }}>
            Software Engineer, Perfetto. Wrote the evaluation letter.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={410} className="card">
          <span className="card__tag">Co-host</span>
          <div className="card__title" style={{ fontSize: 24 }}>Anna Mayzner</div>
          <div className="card__sub" style={{ fontSize: 18 }}>
            Testing-infrastructure owner, diff-test plumbing.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={540} className="card">
          <span className="card__tag">Subject expert</span>
          <div className="card__title" style={{ fontSize: 24 }}>Lalit Maganti</div>
          <div className="card__sub" style={{ fontSize: 18 }}>
            Senior TL, trace processor.
          </div>
        </Animated>
      </div>

      <Animated as="div" animate="fade" delay={700} className="callout callout--math"
        style={{ marginTop: 36 }}>
        A Perfetto trace is a binary stream that becomes a relational
        database. SQL is the user&rsquo;s first-class interface.
      </Animated>
    </SlideFrame>
  );
}
