import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact } from "../lib/format";
import { compoundInterest } from "../lib/formulas";

const FREQ_OPTIONS = [
  { label: "Annually", value: 1 },
  { label: "Semi-Annually", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(1);

  const result = useMemo(() => compoundInterest(principal, rate, years, freq), [principal, rate, years, freq]);

  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      category="Loans & EMI"
      description="Calculate compound interest for any principal, rate, tenure and compounding frequency."
      inputs={
        <>
          <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
          <SliderInput label="Interest Rate" value={rate} min={1} max={20} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Time Period" value={years} min={0.5} max={30} step={0.5} suffix=" yrs" onChange={setYears} />
          <SegmentedField label="Compounding Frequency" value={freq} onChange={setFreq} options={FREQ_OPTIONS} />
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
