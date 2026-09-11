export default function StatCard({ label, value, highlight, sub }) {
  return (
    <div
      className={`rounded-2xl p-4 border transition-colors ${
        highlight
          ? "bg-[var(--accent-gradient)] border-transparent shadow-[0_8px_24px_-8px_rgba(124,92,255,0.45)]"
          : "bg-[var(--surface)] border-[var(--border)]"
      }`}
    >
      <div className={`text-[11px] uppercase tracking-wide mb-1 ${highlight ? "text-white/70" : "text-[var(--text-muted)]"}`}>
        {label}
      </div>
      <div className={`font-display text-2xl font-bold ${highlight ? "text-white" : "text-[var(--text-primary)]"}`}>
        {value}
      </div>
      {sub && <div className={`text-xs mt-1 ${highlight ? "text-white/60" : "text-[var(--text-muted)]"}`}>{sub}</div>}
    </div>
  );
}
