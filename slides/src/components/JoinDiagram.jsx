/**
 * JoinDiagram — animated relational join over two interval tables.
 *
 * Renders two small tables side by side and draws curved connectors between
 * rows whose intervals overlap. The connectors fade in last, mimicking a
 * step-by-step explanation of how an interval join walks both relations.
 */
import { Animated } from './Animated.jsx';

const R = [
  { id: 1, addr: '0x4010', cycles: 12 },
  { id: 2, addr: '0x4028', cycles: 9 },
  { id: 3, addr: '0x4044', cycles: 24 },
  { id: 4, addr: '0x4060', cycles: 7 },
];
const S = [
  { id: 'a', sym: 'init',  range: '0x4000..0x4040' },
  { id: 'b', sym: 'loop',  range: '0x4040..0x4090' },
  { id: 'c', sym: 'fini',  range: '0x4090..0x40c0' },
];

const matches = [
  [0, 0], [1, 0],   // 0x4010, 0x4028 → init
  [2, 1], [3, 1],   // 0x4044, 0x4060 → loop
];

export function JoinDiagram() {
  const W = 1100;
  const rowH = 50;
  const rTop = 80;
  const lCol = 80;
  const rCol = 740;
  const rWidth = 280;

  return (
    <svg viewBox={`0 0 ${W} 360`} width="100%" style={{ maxWidth: 1100 }}>
      {/* left table — execution intervals (R) */}
      <Animated as="g" animate="up" delay={100}>
        <text x={lCol} y={50} fontSize="22"
              fill="var(--color-ink-muted)" fontFamily="var(--font-mono)">
          R · etm_execution
        </text>
        {R.map((row, i) => (
          <g key={row.id}>
            <rect x={lCol} y={rTop + i * rowH} width={rWidth - 20} height={rowH - 10}
                  rx="8" fill="var(--color-bg-elevated)"
                  stroke="var(--color-rule)" strokeWidth="1.5" />
            <text x={lCol + 22} y={rTop + i * rowH + 28} fontSize="22"
                  fontFamily="var(--font-mono)" fill="var(--color-ink)">
              {row.addr}
            </text>
            <text x={lCol + 200} y={rTop + i * rowH + 28} fontSize="22"
                  fontFamily="var(--font-mono)" fill="var(--color-ink-muted)"
                  textAnchor="end">
              {row.cycles}c
            </text>
          </g>
        ))}
      </Animated>

      {/* right table — symbol ranges (S) */}
      <Animated as="g" animate="up" delay={300}>
        <text x={rCol} y={50} fontSize="22"
              fill="var(--color-ink-muted)" fontFamily="var(--font-mono)">
          S · symbol_ranges
        </text>
        {S.map((row, i) => (
          <g key={row.id}>
            <rect x={rCol} y={rTop + (i + 0.5) * rowH} width={rWidth} height={rowH - 10}
                  rx="8" fill="var(--color-bg-elevated)"
                  stroke="var(--color-rule)" strokeWidth="1.5" />
            <text x={rCol + 22} y={rTop + (i + 0.5) * rowH + 28} fontSize="22"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-math)" fontWeight="700">
              {row.sym}
            </text>
            <text x={rCol + rWidth - 22} y={rTop + (i + 0.5) * rowH + 28} fontSize="20"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-ink-muted)" textAnchor="end">
              {row.range}
            </text>
          </g>
        ))}
      </Animated>

      {/* curved connectors */}
      {matches.map(([i, j], idx) => {
        const x1 = lCol + rWidth - 20;
        const y1 = rTop + i * rowH + (rowH - 10) / 2;
        const x2 = rCol;
        const y2 = rTop + (j + 0.5) * rowH + (rowH - 10) / 2;
        const mx = (x1 + x2) / 2;
        return (
          <Animated key={idx} as="g" animate="ease" delay={700 + idx * 120}>
            <path
              d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="var(--color-math)"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />
            <circle cx={x1} cy={y1} r="5" fill="var(--color-math)" />
            <circle cx={x2} cy={y2} r="5" fill="var(--color-math)" />
          </Animated>
        );
      })}
    </svg>
  );
}
