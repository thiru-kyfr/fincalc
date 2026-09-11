import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";
import { ppfSchedule } from "../lib/formulas";

const RATE = 7.1;

export default function PpfCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [years, setYears] = useState(15);

  const rows = useMemo(() => ppfSchedule(yearly, years, RATE), [yearly, years]);
  const invested = yearly * years;
  const maturity = rows.length ? rows[rows.length - 1].balance : 0;
  const interest = maturity - invested;
  const series = rows.map((r) => ({ label: `Yr ${r.year}`, balance: r.balance }));

  return (
    <CalculatorShell
      title="PPF Calculator"
      category="Savings"
      description={`Calculate your Public Provident Fund maturity value at the current rate of ${RATE}% p.a., compounded annually and tax-free under EEE.`}
      inputs={
        <>
          <div className="mb-6 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2.5 text-sm">
            <span className="text-[var(--text-secondary)]">Current PPF Interest Rate</span>
            <div className="text-[var(--accent)] font-semibold">{RATE}% p.a.</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">Compounded annually · Tax-free under EEE</div>
          </div>
          <SliderInput label="Yearly Investment" value={yearly} min={500} max={150000} step={500} prefix="₹" onChange={setYearly} />
          <SliderInput label="Investment Period" value={years} min={15} max={50} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Invested" value={formatCompact(invested)} />
        <StatCard label="Interest Earned" value={formatCompact(interest)} />
        <StatCard label="Maturity Value" value={formatCompact(maturity)} highlight />
      </div>
      <Donut
        title="Breakdown"
        segments={[
          { label: "Invested", value: invested },
          { label: "Returns", value: interest },
        ]}
      />
      <GrowthChart title="Year-wise Growth" series={series} lines={[{ key: "balance", name: "Balance", color: "var(--accent)" }]} />
      <DataTable
        title="Year-wise Breakdown"
        columns={["Year", "Deposit", "Interest", "Balance"]}
        rows={rows.map((r) => [`Year ${r.year}`, formatCurrency(r.deposit), formatCurrency(r.interest), formatCurrency(r.balance)])}
      />
    </CalculatorShell>
  );
}
