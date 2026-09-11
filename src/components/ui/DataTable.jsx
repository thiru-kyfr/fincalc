export default function DataTable({ title, columns, rows }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5">
      {title && <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-3">{title}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2b2d3a]">
              {columns.map((c) => (
                <th key={c} className="text-left text-gray-500 font-medium py-2 pr-4 whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#22232e] last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="py-2 pr-4 text-gray-300 whitespace-nowrap">
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
