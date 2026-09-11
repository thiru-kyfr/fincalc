export default function StatCard({ label, value, highlight, sub }) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border-violet-500/40"
          : "bg-[#15161d] border-[#2b2d3a]"
      }`}
    >
      <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${highlight ? "text-violet-300" : "text-gray-100"}`}>{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}
