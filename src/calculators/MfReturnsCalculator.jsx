import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact, formatPercent } from "../lib/format";
import { cagr } from "../lib/formulas";

export default function MfReturnsCalculator() {
  const [invested, setInvested] = useState(100000);
  const [current, setCurrent] = useState(150000);
  const [years, setYears] = useState(3);

  const result = useMemo(() => {
    const gain = current - invested;
    const absoluteReturn = invested > 0 ? (gain / invested) * 100 : 0;
    const annualised = cagr(invested, current, years);
    return { gain, absoluteReturn, annualised };
  }, [invested, current, years]);

  return (
    <CalculatorShell
      title="MF Returns Calculator"
      category="Investment"
      description="Calculate absolute and annualised (CAGR) returns on your mutual fund investment."
      inputs={
        <>
          <SliderInput label="Invested Amount" value={invested} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInvested} />
          <SliderInput label="Current Value" value={current} min={1000} max={20000000} step={1000} prefix="₹" onChange={setCurrent} />
          <SliderInput label="Holding Period" value={years} min={0.5} max={30} step={0.5} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Gain / Loss" value={formatCompact(result.gain)} />
        <StatCard label="Absolute Return" value={formatPercent(result.absoluteReturn)} />
        <StatCard label="Annualised (CAGR)" value={formatPercent(result.annualised)} highlight />
      </div>
      <Donut
        title="Value Breakdown"
        segments={[
          { label: "Invested", value: invested },
          { label: "Gain", value: Math.max(0, result.gain) },
        ]}
      />
    </CalculatorShell>
  );
}
