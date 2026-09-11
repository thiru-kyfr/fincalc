import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact } from "../lib/format";
import { compoundInterest } from "../lib/formulas";

const FREQ_OPTIONS = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Half-Yearly", value: 2 },
  { label: "Yearly", value: 1 },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const result = useMemo(() => compoundInterest(principal, rate, years, freq), [principal, rate, years, freq]);

  return (
    <CalculatorShell
      title="FD Calculator"
      category="Savings"
      description="Check maturity value on a fixed deposit for any interest rate, tenure and compounding frequency."
      inputs={
        <>
          <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
          <SliderInput label="Interest Rate" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Tenure" value={years} min={0.25} max={10} step={0.25} suffix=" yrs" onChange={setYears} />
          <SegmentedField label="Compounding Frequency" value={freq} onChange={setFreq} options={FREQ_OPTIONS} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Principal" value={formatCompact(principal)} />
        <StatCard label="Interest Earned" value={formatCompact(result.interest)} />
        <StatCard label="Maturity Value" value={formatCompact(result.amount)} highlight />
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
