import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function TeamAndProduct() {
  return (
    <SlideFrame
      eyebrow="The team"
      title="Web Performance · Perfetto"
      subtitle="Open-source performance instrumentation and trace analysis. The tool Android, Chrome and server engineers reach for when nanoseconds matter."
    >
      <div className="grid-cards grid-cards--3" style={{ marginTop: 16 }}>
        <Animated as="div" animate="up" delay={200} className="card">
          <span className="card__tag">Where</span>
          <div className="card__title">Google UK</div>
          <div className="card__sub">Belgrave House, London SW1W 9TQ.</div>
        </Animated>
        <Animated as="div" animate="up" delay={350} className="card">
          <span className="card__tag">Supervisor</span>
          <div className="card__title">Rasika Navarange</div>
          <div className="card__sub">Software Engineer, Perfetto team.</div>
        </Animated>
        <Animated as="div" animate="up" delay={500} className="card">
          <span className="card__tag">Codebase</span>
          <div className="card__title">google/perfetto</div>
          <div className="card__sub">Public, open-source, C++ &amp; TypeScript.</div>
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
