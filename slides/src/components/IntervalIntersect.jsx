/**
 * IntervalIntersect — animated illustration of the half-open interval
 * intersection [a, b) ∩ [c, d).
 *
 * Two intervals slide in along a shared number line; the overlap region
 * fills in last, in the math-accent colour. The animation triggers via the
 * `.anim` classes, so it plays whenever the parent slide becomes active.
 */
import { Animated } from './Animated.jsx';

export function IntervalIntersect({
  a = 80, b = 480, c = 320, d = 760,
  labels = { ab: '[a, b)', cd: '[c, d)', overlap: '[a, b) ∩ [c, d)' },
}) {
  const lineY = 140;
  const aH = 22;
  const W = 880;
  const H = 240;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 1080 }}>
      {/* number line */}
      <line x1="40" x2={W - 40} y1={lineY} y2={lineY}
            stroke="var(--color-rule)" strokeWidth="2" />
      {[100, 250, 400, 550, 700].map((x) => (
        <line key={x} x1={x} x2={x} y1={lineY - 6} y2={lineY + 6}
              stroke="var(--color-ink-faint)" strokeWidth="1.5" />
      ))}

      {/* [a, b) */}
      <Animated as="g" animate="up" delay={150}>
        <rect x={a} y={lineY - aH - 30} width={b - a} height={aH}
              rx="6" fill="var(--color-accent)" opacity="0.85" />
        <text x={(a + b) / 2} y={lineY - aH - 42} textAnchor="middle"
              fontSize="20" fill="var(--color-ink)"
              fontFamily="var(--font-serif)" fontStyle="italic">
          {labels.ab}
        </text>
      </Animated>

      {/* [c, d) */}
      <Animated as="g" animate="up" delay={400}>
        <rect x={c} y={lineY + 8} width={d - c} height={aH}
              rx="6" fill="var(--color-warm)" opacity="0.85" />
        <text x={(c + d) / 2} y={lineY + aH + 36} textAnchor="middle"
              fontSize="20" fill="var(--color-ink)"
              fontFamily="var(--font-serif)" fontStyle="italic">
          {labels.cd}
        </text>
      </Animated>

      {/* intersection */}
      <Animated as="g" animate="pop" delay={900}>
        <rect x={Math.max(a, c)} y={lineY - aH / 2 - 6}
              width={Math.min(b, d) - Math.max(a, c)} height={aH + 12}
              rx="8" fill="var(--color-math)" opacity="0.95" />
        <text x={(Math.max(a, c) + Math.min(b, d)) / 2} y={lineY + 70}
              textAnchor="middle" fontSize="22" fill="var(--color-math)"
              fontWeight="700" fontFamily="var(--font-serif)">
          {labels.overlap}
        </text>
      </Animated>
    </svg>
  );
}
