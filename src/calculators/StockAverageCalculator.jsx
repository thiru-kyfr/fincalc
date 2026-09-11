import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/ui/StatCard";
import DataTable from "../components/ui/DataTable";
import Icon from "../components/Icon";
import { CATEGORY_META } from "../data/calculators";
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

  const meta = CATEGORY_META.Trading;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-up">
      <div className="text-xs text-[var(--text-muted)] mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:text-[var(--accent)] transition-colors">
          Calculators
        </Link>
        <span>/</span>
        <span style={{ color: meta.color }}>Trading</span>
      </div>
      <div className="flex items-center gap-3.5 mb-2">
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `color-mix(in srgb, ${meta.color} 16%, transparent)`, color: meta.color }}
        >
          <Icon name="layers2" size={22} />
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
          Stock Average Calculator
        </h1>
      </div>
      <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-2xl">
        Add each buy transaction to calculate your weighted average purchase price.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 h-fit">
          <div className="text-sm font-semibold text-[var(--text-primary)] mb-4">Buy Transactions</div>
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] w-5">{i + 1}</span>
                <input
                  type="number"
                  placeholder="Qty"
                  value={r.qty}
                  onChange={(e) => updateRow(r.id, "qty", e.target.value)}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={r.price}
                  onChange={(e) => updateRow(r.id, "price", e.target.value)}
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  onClick={() => removeRow(r.id)}
                  className="text-[var(--text-muted)] hover:text-red-400 text-lg leading-none px-1"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addRow}
            className="mt-4 w-full text-sm text-[var(--accent)] border border-dashed border-[var(--accent)]/40 rounded-lg py-2 hover:bg-[var(--accent-soft)]"
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
