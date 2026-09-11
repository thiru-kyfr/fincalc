import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact, formatPercent } from "../lib/format";
import { cagr } from "../lib/formulas";

export default function RoiCalculator() {
  const [invested, setInvested] = useState(100000);
  const [returned, setReturned] = useState(150000);
  const [years, setYears] = useState(3);

  const result = useMemo(() => {
    const gain = returned - invested;
    const roi = invested > 0 ? (gain / invested) * 100 : 0;
    const annualised = cagr(invested, returned, years);
    return { gain, roi, annualised };
  }, [invested, returned, years]);

  return (
    <CalculatorShell
      title="ROI Calculator"
      category="Investment"
      description="Calculate the return on investment for your portfolio, with an annualised figure for comparison."
      inputs={
        <>
          <SliderInput label="Amount Invested" value={invested} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInvested} />
          <SliderInput label="Amount Returned" value={returned} min={1000} max={20000000} step={1000} prefix="₹" onChange={setReturned} />
          <SliderInput label="Holding Period" value={years} min={0.5} max={30} step={0.5} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Net Gain" value={formatCompact(result.gain)} />
        <StatCard label="ROI" value={formatPercent(result.roi)} highlight />
        <StatCard label="Annualised ROI" value={formatPercent(result.annualised)} />
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
