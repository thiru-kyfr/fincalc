import { formatCompact } from "../../lib/format";

const COLORS = ["#8b5cf6", "#22d3ee", "#f472b6", "#facc15", "#34d399"];

export default function Donut({ segments, title = "Breakdown" }) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  let acc = 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5">
      <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-4">{title}</div>
      <div className="flex items-center gap-6 flex-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90 shrink-0">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#22232e" strokeWidth="18" />
          {segments.map((seg, i) => {
            const frac = Math.max(0, seg.value) / total;
            const dash = frac * circumference;
            const offset = acc * circumference;
            acc += frac;
            return (
              <circle
                key={seg.label}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={seg.color || COLORS[i % COLORS.length]}
                strokeWidth="18"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <div className="flex-1 min-w-[140px] space-y-2.5">
          {segments.map((seg, i) => (
            <div key={seg.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: seg.color || COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-400">{seg.label}</span>
              </div>
              <div className="text-right">
                <div className="text-gray-100 font-medium">{formatCompact(seg.value)}</div>
                <div className="text-gray-500 text-xs">{((seg.value / total) * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
