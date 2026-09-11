export default function DataTable({ title, columns, rows }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      {title && <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] font-semibold mb-3">{title}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((c) => (
                <th key={c} className="text-left text-[var(--text-muted)] font-medium py-2.5 pr-4 whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[var(--surface-3)] last:border-0 hover:bg-[var(--surface-2)] transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="py-2.5 pr-4 text-[var(--text-secondary)] whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
