import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import { formatCompact } from "../lib/format";

function simulateStepUp(monthly, stepUpPct, ratePct, years) {
  const i = ratePct / 100 / 12;
  let balance = 0;
  let invested = 0;
  let currentMonthly = monthly;
  const series = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      balance += currentMonthly;
      invested += currentMonthly;
      balance *= 1 + i;
    }
    series.push({ label: `Yr ${y}`, invested, total: balance });
    currentMonthly *= 1 + stepUpPct / 100;
  }
  return { total: balance, invested, series };
}

export default function StepUpSipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => simulateStepUp(monthly, stepUp, rate, years), [monthly, stepUp, rate, years]);
  const returns = result.total - result.invested;

  return (
    <CalculatorShell
      title="Step Up SIP Calculator"
      category="Investment"
      description="Calculate SIP returns when you increase your monthly investment by a fixed percentage every year."
      inputs={
        <>
          <SliderInput label="Monthly Investment" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} />
          <SliderInput label="Annual Step-up" value={stepUp} min={0} max={50} step={1} suffix="%" onChange={setStepUp} />
          <SliderInput label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Investment Period" value={years} min={1} max={40} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Invested" value={formatCompact(result.invested)} />
        <StatCard label="Est. Returns" value={formatCompact(returns)} />
        <StatCard label="Total Value" value={formatCompact(result.total)} highlight />
      </div>
      <Donut
        title="Investment Breakdown"
        segments={[
          { label: "Invested", value: result.invested },
          { label: "Returns", value: returns },
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
