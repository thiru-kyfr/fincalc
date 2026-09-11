import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact, formatPercent } from "../lib/format";
import { cagr } from "../lib/formulas";

export default function CagrCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(200000);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    const rate = cagr(initial, final, years);
    return { rate, gain: final - initial };
  }, [initial, final, years]);

  return (
    <CalculatorShell
      title="CAGR Calculator"
      category="Investment"
      description="The simplest compound annual growth rate calculator — enter start value, end value and duration."
      inputs={
        <>
          <SliderInput label="Initial Value" value={initial} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInitial} />
          <SliderInput label="Final Value" value={final} min={1000} max={20000000} step={1000} prefix="₹" onChange={setFinal} />
          <SliderInput label="Duration" value={years} min={0.5} max={40} step={0.5} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Absolute Gain" value={formatCompact(result.gain)} />
        <StatCard label="CAGR" value={formatPercent(result.rate)} highlight />
        <StatCard label="Duration" value={`${years} yrs`} />
      </div>
      <Donut
        title="Value Breakdown"
        segments={[
          { label: "Initial", value: initial },
          { label: "Gain", value: Math.max(0, result.gain) },
        ]}
      />
    </CalculatorShell>
  );
}
