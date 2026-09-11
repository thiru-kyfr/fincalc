import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import { formatCompact } from "../lib/format";
import { lumpsumFutureValue } from "../lib/formulas";

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const total = lumpsumFutureValue(amount, rate, years);
    const returns = total - amount;
    const series = [];
    for (let y = 1; y <= years; y++) {
      series.push({ label: `Yr ${y}`, invested: amount, total: lumpsumFutureValue(amount, rate, y) });
    }
    return { total, returns, series };
  }, [amount, rate, years]);

  return (
    <CalculatorShell
      title="Lumpsum Calculator"
      category="Investment"
      description="Calculate returns on a one-time lumpsum investment over a chosen time period."
      inputs={
        <>
          <SliderInput label="Investment Amount" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
          <SliderInput label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Investment Period" value={years} min={1} max={40} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Invested" value={formatCompact(amount)} />
        <StatCard label="Est. Returns" value={formatCompact(result.returns)} />
        <StatCard label="Total Value" value={formatCompact(result.total)} highlight />
      </div>
      <Donut
        title="Investment Breakdown"
        segments={[
          { label: "Invested", value: amount },
          { label: "Returns", value: result.returns },
        ]}
      />
      <GrowthChart
        title="Year-wise Growth"
        series={result.series}
        lines={[
          { key: "invested", name: "Invested", color: "#22d3ee" },
          { key: "total", name: "Total Value", color: "#8b5cf6" },
        ]}
      />
    </CalculatorShell>
  );
}
