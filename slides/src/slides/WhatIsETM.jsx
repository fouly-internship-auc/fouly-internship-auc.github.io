import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

export default function WhatIsETM() {
  return (
    <SlideFrame eyebrow="Primer"
      title="One slide on ETM"
      subtitle="Just enough to make the next three slides make sense."
    >
      <div className="grid-cards grid-cards--3" style={{ marginTop: 16 }}>
        <Animated as="div" animate="up" delay={150} className="card">
          <span className="card__tag">What it is</span>
          <div className="card__title">On-die hardware</div>
          <div className="card__sub">
            ARM cores can emit a cycle-accurate record of which
            instructions they execute. Most ARM SoCs in the wild ship
            with the capability; very few teams actually use it.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={320} className="card">
          <span className="card__tag">What it emits</span>
          <div className="card__title">Packet streams</div>
          <div className="card__sub">
            Compressed, encoded packets — branch broadcasts, atoms, cycle
            counts, exception markers. Sparse documentation, scattered
            across ARM&rsquo;s architecture manuals.
          </div>
        </Animated>
        <Animated as="div" animate="up" delay={490} className="card">
          <span className="card__tag">The catch</span>
          <div className="card__title">A different clock</div>
          <div className="card__sub">
            ETM packets are timestamped against an independent hardware
            clock. Unaligned, they sit beside the rest of the trace, not
            inside it.
          </div>
        </Animated>
      </div>

      <Animated as="div" animate="fade" delay={750}
        className="callout" style={{ marginTop: 40 }}>
        <strong>The job:</strong> make ETM data look like every other relation
        in the trace processor &mdash; decoded, aligned, and queryable from SQL.
      </Animated>
    </SlideFrame>
  );
}
