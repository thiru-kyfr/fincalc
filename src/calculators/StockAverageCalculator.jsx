import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/ui/StatCard";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";

let idCounter = 3;

export default function StockAverageCalculator() {
  const [rows, setRows] = useState([
    { id: 1, qty: 50, price: 1200 },
    { id: 2, qty: 30, price: 1150 },
  ]);

  const result = useMemo(() => {
    const totalQty = rows.reduce((s, r) => s + (Number(r.qty) || 0), 0);
    const totalInvestment = rows.reduce((s, r) => s + (Number(r.qty) || 0) * (Number(r.price) || 0), 0);
    const avgPrice = totalQty > 0 ? totalInvestment / totalQty : 0;
    return { totalQty, totalInvestment, avgPrice };
  }, [rows]);

  const updateRow = (id, key, value) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value === "" ? "" : Number(value) } : r)));
  };
  const addRow = () => setRows((rs) => [...rs, { id: ++idCounter, qty: "", price: "" }]);
  const removeRow = (id) => setRows((rs) => rs.filter((r) => r.id !== id));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
        <Link to="/" className="hover:text-violet-400">
          Calculators
        </Link>
        <span>/</span>
        <span className="text-gray-400">Trading</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-1">Stock Average Calculator</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-2xl">
        Add each buy transaction to calculate your weighted average purchase price.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
        <div className="bg-[#15161d] border border-[#2b2d3a] rounded-2xl p-5 h-fit">
          <div className="text-sm font-semibold text-gray-200 mb-4">Buy Transactions</div>
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-5">{i + 1}</span>
                <input
                  type="number"
                  placeholder="Qty"
                  value={r.qty}
                  onChange={(e) => updateRow(r.id, "qty", e.target.value)}
                  className="w-full bg-[#1a1b23] border border-[#2b2d3a] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-violet-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={r.price}
                  onChange={(e) => updateRow(r.id, "price", e.target.value)}
                  className="w-full bg-[#1a1b23] border border-[#2b2d3a] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={() => removeRow(r.id)}
                  className="text-gray-500 hover:text-red-400 text-lg leading-none px-1"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addRow}
            className="mt-4 w-full text-sm text-violet-400 border border-dashed border-violet-500/40 rounded-lg py-2 hover:bg-violet-500/10"
          >
            + Add Transaction
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Total Quantity" value={result.totalQty} />
            <StatCard label="Total Investment" value={formatCompact(result.totalInvestment)} />
            <StatCard label="Average Price" value={formatCurrency(result.avgPrice, { decimals: 2 })} highlight />
          </div>
          <DataTable
            title="Transactions"
            columns={["#", "Qty", "Price", "Value"]}
            rows={rows.map((r, i) => [
              i + 1,
              r.qty || 0,
              formatCurrency(r.price || 0),
              formatCurrency((Number(r.qty) || 0) * (Number(r.price) || 0)),
            ])}
          />
        </div>
      </div>
    </div>
  );
}
