import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";

function simulateSwp(totalInvestment, monthlyWithdrawal, annualRatePct, years) {
  const i = annualRatePct / 100 / 12;
  let balance = totalInvestment;
  let totalWithdrawn = 0;
  const months = years * 12;
  const yearRows = [];
  let yearWithdrawn = 0;

  for (let m = 1; m <= months; m++) {
    balance += balance * i;
    const w = Math.min(monthlyWithdrawal, Math.max(0, balance));
    balance -= w;
    totalWithdrawn += w;
    yearWithdrawn += w;
    if (m % 12 === 0) {
      yearRows.push({ year: m / 12, withdrawn: yearWithdrawn, balance: Math.max(0, balance) });
      yearWithdrawn = 0;
    }
    if (balance <= 0) {
      balance = 0;
      break;
    }
  }
  return { finalBalance: Math.max(0, balance), totalWithdrawn, yearRows };
}

export default function SwpCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => simulateSwp(totalInvestment, withdrawal, rate, years),
    [totalInvestment, withdrawal, rate, years]
  );

  const series = result.yearRows.map((r) => ({ label: `Yr ${r.year}`, balance: r.balance }));

  return (
    <CalculatorShell
      title="SWP Calculator"
      category="Investment"
      description="Model a Systematic Withdrawal Plan — see your remaining corpus after regular monthly withdrawals."
      inputs={
        <>
          <SliderInput label="Total Investment" value={totalInvestment} min={10000} max={100000000} step={10000} prefix="₹" onChange={setTotalInvestment} />
          <SliderInput label="Monthly Withdrawal" value={withdrawal} min={500} max={1000000} step={500} prefix="₹" onChange={setWithdrawal} />
          <SliderInput label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Withdrawal Period" value={years} min={1} max={40} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Invested" value={formatCompact(totalInvestment)} />
        <StatCard label="Total Withdrawn" value={formatCompact(result.totalWithdrawn)} />
        <StatCard label="Final Balance" value={formatCompact(result.finalBalance)} highlight />
      </div>
      <Donut
        title="Investment Utilisation"
        segments={[
          { label: "Withdrawn", value: result.totalWithdrawn },
          { label: "Remaining", value: result.finalBalance },
        ]}
      />
      <GrowthChart
        title="Balance Over Time"
        series={series}
        lines={[{ key: "balance", name: "Balance", color: "var(--accent)" }]}
      />
      <DataTable
        title="Year-wise Withdrawal"
        columns={["Year", "Withdrawn", "Balance"]}
        rows={result.yearRows.map((r) => [`Year ${r.year}`, formatCurrency(r.withdrawn), formatCurrency(r.balance)])}
      />
    </CalculatorShell>
  );
}
