/**
 * CycleCount — animated cumulative cycle aggregate.
 *
 * Renders a row of per-event cycle bars, then animates a running total
 * being assembled above. Conveys the fold/scan structure of the aggregate
 *
 *   C(R) = Σ_{r ∈ I, r.addr ∈ R} r.cycles
 */
import { Animated } from './Animated.jsx';

const CYCLES = [12, 7, 19, 5, 24, 11, 8, 16];

export function CycleCount() {
  const W = 1100;
  const H = 320;
  const barW = 90;
  const gap = 24;
  const baseY = 240;
  const startX = 100;
  const maxCycle = Math.max(...CYCLES);
  const scale = 150 / maxCycle;

  let runningTotal = 0;
  const cumulative = CYCLES.map((c) => (runningTotal += c));
  const total = runningTotal;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 1100 }}>
      {/* baseline */}
      <line x1={startX - 20} x2={startX + CYCLES.length * (barW + gap) + 10}
            y1={baseY} y2={baseY}
            stroke="var(--color-rule)" strokeWidth="2" />

      {CYCLES.map((c, i) => {
        const x = startX + i * (barW + gap);
        const h = c * scale;
        return (
          <Animated key={i} as="g" animate="up" delay={150 + i * 90}>
            <rect x={x} y={baseY - h} width={barW} height={h} rx="6"
                  fill="var(--color-accent)" opacity="0.9" />
            <text x={x + barW / 2} y={baseY + 30} textAnchor="middle"
                  fontSize="22" fontFamily="var(--font-mono)"
                  fill="var(--color-ink-muted)">{c}c</text>
            <text x={x + barW / 2} y={baseY - h - 12} textAnchor="middle"
                  fontSize="18" fontFamily="var(--font-mono)"
                  fill="var(--color-math)" fontWeight="700">
              Σ {cumulative[i]}
            </text>
          </Animated>
        );
      })}

      {/* total ribbon */}
      <Animated as="g" animate="pop" delay={150 + CYCLES.length * 90 + 200}>
        <rect x={W - 320} y={40} width="240" height="56" rx="28"
              fill="var(--color-math)" />
        <text x={W - 200} y={76} textAnchor="middle"
              fontSize="26" fontFamily="var(--font-serif)" fontWeight="700"
              fill="#fff">
          C(R) = {total}
        </text>
      </Animated>
    </svg>
  );
}
