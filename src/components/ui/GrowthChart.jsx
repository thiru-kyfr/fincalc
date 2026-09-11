import { formatCompact } from "../../lib/format";

// series: [{ label, ...seriesKeys }]
// lines: [{ key, color, name }]
export default function GrowthChart({ series, lines, title = "Year-wise Growth" }) {
  if (!series || series.length === 0) return null;
  const width = 640;
  const height = 220;
  const padL = 46;
  const padB = 24;
  const padT = 10;
  const padR = 10;

  const allValues = series.flatMap((s) => lines.map((l) => s[l.key] || 0));
  const maxVal = Math.max(...allValues, 1);
  const n = series.length;

  const x = (i) => padL + (i / Math.max(1, n - 1)) * (width - padL - padR);
  const y = (v) => height - padB - (v / maxVal) * (height - padB - padT);

  const yTicks = 4;

  return (
    <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-[11px] uppercase tracking-wide text-gray-500">{title}</div>
        <div className="flex gap-4">
          {lines.map((l) => (
            <div key={l.key} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: l.color }} />
              {l.name}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" style={{ minWidth: 480 }}>
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const v = (maxVal / yTicks) * i;
            return (
              <g key={i}>
                <line
                  x1={padL}
                  x2={width - padR}
                  y1={y(v)}
                  y2={y(v)}
                  stroke="#22232e"
                  strokeWidth="1"
                />
                <text x={4} y={y(v) + 4} fontSize="10" fill="#6b7280">
                  {formatCompact(v)}
                </text>
              </g>
            );
          })}
          {lines.map((l) => {
            const points = series.map((s, i) => `${x(i)},${y(s[l.key] || 0)}`).join(" ");
            return <polyline key={l.key} points={points} fill="none" stroke={l.color} strokeWidth="2.5" />;
          })}
          {series.map((s, i) => {
            if (n > 12 && i % Math.ceil(n / 8) !== 0 && i !== n - 1) return null;
            return (
              <text key={i} x={x(i)} y={height - 4} fontSize="10" fill="#6b7280" textAnchor="middle">
                {s.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
