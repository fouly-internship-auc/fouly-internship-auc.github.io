/**
 * ClockAlign — animated illustration of the affine map between the ETM
 * hardware clock and the system clock.
 *
 *   t_sys = α · t_etm + β
 *
 * Two parallel timelines are drawn. Synchronisation events are marked on
 * each; dashed lines connect matching pairs to show how (α, β) are
 * recovered.  An overlay line, animated in last, shows the result of the
 * affine fit.
 */
import { Animated } from './Animated.jsx';

const EVENTS = [0.12, 0.34, 0.58, 0.80];

export function ClockAlign() {
  const W = 1100;
  const H = 320;
  const padX = 80;
  const sysY = 80;
  const etmY = 240;
  const trackW = W - padX * 2;

  // ETM clock is *slower and offset* compared to the system clock.
  // For the visualization we use α = 0.85, β = 0.05 (in normalised units).
  const alpha = 0.85;
  const beta = 0.05;

  const sysX = (t) => padX + t * trackW;
  const etmX = (t) => padX + ((t - beta) / alpha) * trackW;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 1100 }}>
      {/* system clock track */}
      <Animated as="g" animate="up" delay={100}>
        <text x={padX} y={sysY - 30} fontSize="22"
              fill="var(--color-ink-muted)" fontFamily="var(--font-mono)">
          t_sys · CLOCK_MONOTONIC
        </text>
        <line x1={padX} x2={W - padX} y1={sysY} y2={sysY}
              stroke="var(--color-accent)" strokeWidth="3" />
        {EVENTS.map((t, i) => (
          <circle key={i} cx={sysX(t)} cy={sysY} r="8" fill="var(--color-accent)" />
        ))}
      </Animated>

      {/* etm clock track */}
      <Animated as="g" animate="up" delay={350}>
        <text x={padX} y={etmY - 30} fontSize="22"
              fill="var(--color-ink-muted)" fontFamily="var(--font-mono)">
          t_etm · hardware clock
        </text>
        <line x1={padX} x2={W - padX} y1={etmY} y2={etmY}
              stroke="var(--color-warm)" strokeWidth="3" />
        {EVENTS.map((t, i) => (
          <circle key={i} cx={etmX(t)} cy={etmY} r="8" fill="var(--color-warm)" />
        ))}
      </Animated>

      {/* dashed correspondence lines */}
      {EVENTS.map((t, i) => (
        <Animated key={i} as="line"
                  animate="fade" delay={650 + i * 120}
                  x1={sysX(t)} x2={etmX(t)}
                  y1={sysY + 8} y2={etmY - 8}
                  stroke="var(--color-math)" strokeWidth="2"
                  strokeDasharray="5 5" strokeOpacity="0.7" />
      ))}

      {/* recovered affine formula */}
      <Animated as="g" animate="pop" delay={1250}>
        <rect x={W / 2 - 240} y={H - 50} width="480" height="40"
              rx="20" fill="var(--color-math-soft)" />
        <text x={W / 2} y={H - 22} textAnchor="middle"
              fontSize="22" fontFamily="var(--font-serif)"
              fontStyle="italic" fill="var(--color-math)" fontWeight="700">
          t_sys = α · t_etm + β
        </text>
      </Animated>
    </svg>
  );
}
