import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";

const RATE = 8.2;
const CONTRIBUTION_YEARS = 15;
const MATURITY_YEARS = 21;

function ssySchedule(yearly, girlAge) {
  const yearsToMaturity = MATURITY_YEARS - 0; // years from account opening
  let balance = 0;
  const rows = [];
  for (let y = 1; y <= yearsToMaturity; y++) {
    const deposit = y <= CONTRIBUTION_YEARS ? yearly : 0;
    balance += deposit;
    const interest = balance * (RATE / 100);
    balance += interest;
    rows.push({ year: y, age: girlAge + y, deposit, interest, balance });
  }
  return rows;
}

export default function SsyCalculator() {
  const [yearly, setYearly] = useState(50000);
  const [girlAge, setGirlAge] = useState(5);

  const rows = useMemo(() => ssySchedule(yearly, girlAge), [yearly, girlAge]);
  const invested = yearly * CONTRIBUTION_YEARS;
  const maturity = rows.length ? rows[rows.length - 1].balance : 0;
  const interest = maturity - invested;
  const series = rows.map((r) => ({ label: `Yr ${r.year}`, balance: r.balance }));

  return (
    <CalculatorShell
      title="SSY Calculator"
      category="Savings"
      description={`Calculate maturity value for a Sukanya Samriddhi Yojana account at ${RATE}% p.a. — deposits for ${CONTRIBUTION_YEARS} years, maturing after ${MATURITY_YEARS} years.`}
      inputs={
        <>
          <div className="mb-6 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2.5 text-sm">
            <span className="text-[var(--text-secondary)]">Current SSY Interest Rate</span>
            <div className="text-[var(--accent)] font-semibold">{RATE}% p.a.</div>
          </div>
          <SliderInput label="Yearly Investment" value={yearly} min={250} max={150000} step={250} prefix="₹" onChange={setYearly} />
          <SliderInput label="Girl's Current Age" value={girlAge} min={0} max={10} step={1} suffix=" yrs" onChange={setGirlAge} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Invested" value={formatCompact(invested)} sub={`Over ${CONTRIBUTION_YEARS} years`} />
        <StatCard label="Interest Earned" value={formatCompact(interest)} />
        <StatCard label="Maturity Value" value={formatCompact(maturity)} highlight sub={`At age ${girlAge + MATURITY_YEARS}`} />
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
        columns={["Year", "Age", "Deposit", "Interest", "Balance"]}
        rows={rows.map((r) => [`Year ${r.year}`, r.age, formatCurrency(r.deposit), formatCurrency(r.interest), formatCurrency(r.balance)])}
      />
    </CalculatorShell>
  );
}
