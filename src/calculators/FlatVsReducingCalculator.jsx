import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency, formatPercent } from "../lib/format";
import { emi } from "../lib/formulas";

export default function FlatVsReducingCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    const months = years * 12;
    const flatInterest = (amount * rate * years) / 100;
    const flatEmi = (amount + flatInterest) / months;
    const flatTotalPayment = flatEmi * months;

    const reducingEmi = emi(amount, rate, months);
    const reducingTotalPayment = reducingEmi * months;
    const reducingInterest = reducingTotalPayment - amount;

    const effectiveFlatRate = ((flatTotalPayment - amount) / amount / years) * 100;

    return { flatEmi, flatInterest, flatTotalPayment, reducingEmi, reducingInterest, reducingTotalPayment, effectiveFlatRate };
  }, [amount, rate, years]);

  return (
    <CalculatorShell
      title="Flat vs Reducing Rate"
      category="Loans & EMI"
      description="Compare EMI and total interest for the same quoted interest rate under flat and reducing-balance schemes."
      inputs={
        <>
          <SliderInput label="Loan Amount" value={amount} min={10000} max={10000000} step={10000} prefix="₹" onChange={setAmount} />
          <SliderInput label="Interest Rate (Quoted)" value={rate} min={1} max={20} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Loan Tenure" value={years} min={1} max={10} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Flat Rate EMI" value={formatCompact(result.flatEmi)} />
        <StatCard label="Reducing Rate EMI" value={formatCompact(result.reducingEmi)} highlight />
      </div>
      <DataTable
        title="Comparison"
        columns={["", "Flat Rate", "Reducing Rate"]}
        rows={[
          ["Monthly EMI", formatCurrency(result.flatEmi), formatCurrency(result.reducingEmi)],
          ["Total Interest", formatCurrency(result.flatInterest), formatCurrency(result.reducingInterest)],
          ["Total Payment", formatCurrency(result.flatTotalPayment), formatCurrency(result.reducingTotalPayment)],
        ]}
      />
      <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5 text-sm text-gray-400">
        A flat rate of {rate}% works out to an effective reducing-balance rate of roughly{" "}
        <span className="text-gray-100 font-medium">{formatPercent(result.effectiveFlatRate, 1)}</span> — flat-rate
        loans always cost more than their quoted rate suggests.
      </div>
    </CalculatorShell>
  );
}
