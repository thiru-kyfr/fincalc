import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import DataTable from "../components/ui/DataTable";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact, formatCurrency, formatPercent } from "../lib/format";
import { incomeTax } from "../lib/formulas";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(800000);
  const [regime, setRegime] = useState("new");

  const result = useMemo(() => incomeTax(income, regime), [income, regime]);
  const effectiveRate = income > 0 ? (result.totalTax / income) * 100 : 0;

  return (
    <CalculatorShell
      title="Income Tax Calculator"
      category="Tax"
      description="Calculate your payable income tax for FY 2025-26 under the new or old regime, with a full slab-wise breakup."
      inputs={
        <>
          <SegmentedField
            label="Tax Regime"
            value={regime}
            onChange={setRegime}
            options={[
              { label: "New Regime", value: "new" },
              { label: "Old Regime", value: "old" },
            ]}
          />
          <SliderInput label="Annual Income (Gross)" value={income} min={0} max={5000000} step={10000} prefix="₹" onChange={setIncome} />
          <div className="text-xs text-[var(--text-muted)] -mt-3 mb-4">
            Std. deduction {formatCurrency(result.stdDeduction)} applied
            {result.rebate > 0 && " · 87A rebate applied"}
          </div>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Taxable Income" value={formatCompact(result.taxableIncome)} />
        <StatCard label="Effective Rate" value={formatPercent(effectiveRate, 2)} />
        <StatCard label="Total Tax + Cess" value={formatCompact(result.totalTax)} highlight />
        <StatCard label="In-hand (Est.)" value={formatCompact(result.inHand)} />
      </div>
      <Donut
        title="Tax vs In-hand"
        segments={[
          { label: "In-hand", value: result.inHand },
          { label: "Tax", value: result.totalTax },
        ]}
      />
      <DataTable
        title="Slab-wise Breakup"
        columns={["Tax Slab", "Tax Amount"]}
        rows={result.breakup.map((b) => [
          `${formatCurrency(b.from)} – ${formatCurrency(b.to)} @ ${b.rate}%`,
          formatCurrency(b.amount),
        ])}
      />
      {result.rebate > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-sm text-[var(--text-secondary)]">
          Rebate u/s 87A: −{formatCurrency(result.rebate)} → Tax after rebate: {formatCurrency(result.taxAfterRebate)} + Cess: {formatCurrency(result.cess)}
        </div>
      )}
    </CalculatorShell>
  );
}
