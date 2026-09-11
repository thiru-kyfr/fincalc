import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";
import { emi, emiAmortization } from "../lib/formulas";

export default function EmiBase({ title, description, defaults }) {
  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [years, setYears] = useState(defaults.years);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyEmi = emi(amount, rate, months);
    const rows = emiAmortization(amount, rate, months);
    const totalPayment = monthlyEmi * months;
    const totalInterest = totalPayment - amount;

    const yearRows = [];
    for (let y = 0; y < years; y++) {
      const slice = rows.slice(y * 12, y * 12 + 12);
      const principalPaid = slice.reduce((s, r) => s + r.principalPaid, 0);
      const interestPaid = slice.reduce((s, r) => s + r.interest, 0);
      const balance = slice[slice.length - 1]?.balance ?? 0;
      yearRows.push({ year: y + 1, principalPaid, interestPaid, balance });
    }

    const series = yearRows.map((r) => ({ label: `Yr ${r.year}`, principal: r.principalPaid, interest: r.interestPaid }));

    return { monthlyEmi, totalPayment, totalInterest, yearRows, series };
  }, [amount, rate, years]);

  return (
    <CalculatorShell
      title={title}
      category="Loans & EMI"
      description={description}
      inputs={
        <>
          <SliderInput label="Loan Amount" value={amount} min={defaults.amountMin} max={defaults.amountMax} step={defaults.amountStep} prefix="₹" onChange={setAmount} />
          <SliderInput label="Annual Interest Rate" value={rate} min={defaults.rateMin} max={defaults.rateMax} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Loan Tenure" value={years} min={defaults.yearsMin} max={defaults.yearsMax} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Monthly EMI" value={formatCompact(result.monthlyEmi)} highlight />
        <StatCard label="Total Interest" value={formatCompact(result.totalInterest)} />
        <StatCard label="Total Payment" value={formatCompact(result.totalPayment)} />
      </div>
      <Donut
        title="Principal vs Interest"
        segments={[
          { label: "Principal", value: amount },
          { label: "Interest", value: result.totalInterest },
        ]}
      />
      <GrowthChart
        title="Year-wise Principal vs Interest"
        series={result.series}
        lines={[
          { key: "principal", name: "Principal", color: "#22d3ee" },
          { key: "interest", name: "Interest", color: "#f472b6" },
        ]}
      />
      <DataTable
        title={`Amortisation Schedule (First ${Math.min(10, years)} Years)`}
        columns={["Year", "Principal Paid", "Interest Paid", "Balance"]}
        rows={result.yearRows
          .slice(0, 10)
          .map((r) => [`Year ${r.year}`, formatCurrency(r.principalPaid), formatCurrency(r.interestPaid), formatCurrency(r.balance)])}
      />
    </CalculatorShell>
  );
}
