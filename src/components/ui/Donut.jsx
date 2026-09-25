import { formatCompact } from "../../lib/format";

const COLORS = ["var(--accent)", "var(--gold)", "var(--accent-2)", "var(--safe)", "#38bdf8"];

export default function Donut({ segments, title = "Breakdown" }) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  let acc = 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-4 font-semibold">{title}</div>
      <div className="flex items-center gap-6 flex-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90 shrink-0">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--surface-3)" strokeWidth="16" />
          {segments.map((seg, i) => {
            const frac = Math.max(0, seg.value) / total;
            const gap = segments.length > 1 ? 2 : 0;
            const dash = Math.max(0, frac * circumference - gap);
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
                strokeWidth="16"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
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
                <span className="text-[var(--text-secondary)]">{seg.label}</span>
              </div>
              <div className="text-right">
                <div className="text-[var(--text-primary)] font-medium">{formatCompact(seg.value)}</div>
                <div className="text-[var(--text-muted)] text-xs">{((seg.value / total) * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
