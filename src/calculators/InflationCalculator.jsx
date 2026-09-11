import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import GrowthChart from "../components/ui/GrowthChart";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact } from "../lib/format";

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const [mode, setMode] = useState("future-cost");

  const result = useMemo(() => {
    const futureCost = amount * Math.pow(1 + rate / 100, years);
    const erodedValue = amount / Math.pow(1 + rate / 100, years);
    const series = [];
    for (let y = 0; y <= years; y++) {
      series.push({
        label: `Yr ${y}`,
        value: mode === "future-cost" ? amount * Math.pow(1 + rate / 100, y) : amount / Math.pow(1 + rate / 100, y),
      });
    }
    return { futureCost, erodedValue, series };
  }, [amount, rate, years, mode]);

  return (
    <CalculatorShell
      title="Inflation Calculator"
      category="Loans & EMI"
      description="See how inflation inflates future cost, or erodes the purchasing power of today's money."
      inputs={
        <>
          <SegmentedField
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { label: "Future Cost", value: "future-cost" },
              { label: "Value Erosion", value: "erosion" },
            ]}
          />
          <SliderInput label="Current Amount" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
          <SliderInput label="Inflation Rate" value={rate} min={1} max={15} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Time Period" value={years} min={1} max={50} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Today's Amount" value={formatCompact(amount)} />
        <StatCard
          label={mode === "future-cost" ? "Future Cost" : "Value in Today's Terms"}
          value={formatCompact(mode === "future-cost" ? result.futureCost : result.erodedValue)}
          highlight
        />
      </div>
      <GrowthChart title="Value Over Time" series={result.series} lines={[{ key: "value", name: "Value", color: "#8b5cf6" }]} />
    </CalculatorShell>
  );
}
