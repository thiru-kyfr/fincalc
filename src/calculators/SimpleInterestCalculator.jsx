import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact } from "../lib/format";
import { simpleInterest } from "../lib/formulas";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const result = useMemo(() => simpleInterest(principal, rate, years), [principal, rate, years]);

  return (
    <CalculatorShell
      title="Simple Interest Calculator"
      category="Loans & EMI"
      description="Calculate simple interest on loans and savings — interest is charged only on the principal."
      inputs={
        <>
          <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
          <SliderInput label="Interest Rate" value={rate} min={1} max={20} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Time Period" value={years} min={0.5} max={30} step={0.5} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Principal" value={formatCompact(principal)} />
        <StatCard label="Interest" value={formatCompact(result.interest)} />
        <StatCard label="Total Amount" value={formatCompact(result.amount)} highlight />
      </div>
      <Donut
        title="Breakdown"
        segments={[
          { label: "Principal", value: principal },
          { label: "Interest", value: result.interest },
        ]}
      />
    </CalculatorShell>
  );
}
