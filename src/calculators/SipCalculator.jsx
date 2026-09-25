import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import { formatCompact } from "../lib/format";
import { sipFutureValue } from "../lib/formulas";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const months = years * 12;
    const total = sipFutureValue(monthly, rate, months);
    const invested = monthly * months;
    const returns = total - invested;

    const series = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const fv = sipFutureValue(monthly, rate, m);
      series.push({ label: `Yr ${y}`, invested: monthly * m, total: fv });
    }
    return { total, invested, returns, series };
  }, [monthly, rate, years]);

  return (
    <CalculatorShell
      title="SIP Calculator"
      category="Investment"
      description="Calculate how much your monthly SIP will grow to, based on expected return and time period."
      inputs={
        <>
          <SliderInput label="Monthly Investment" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} />
          <SliderInput label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Investment Period" value={years} min={1} max={40} step={1} suffix=" yrs" onChange={setYears} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Invested" value={formatCompact(result.invested)} />
        <StatCard label="Est. Returns" value={formatCompact(result.returns)} />
        <StatCard label="Total Value" value={formatCompact(result.total)} highlight />
      </div>
      <Donut
        title="Investment Breakdown"
        segments={[
          { label: "Invested", value: result.invested },
          { label: "Returns", value: result.returns },
        ]}
      />
      <GrowthChart
        title="Year-wise Growth"
        series={result.series}
        lines={[
          { key: "invested", name: "Invested", color: "#ffc24b" },
          { key: "total", name: "Total Value", color: "var(--accent)" },
        ]}
      />
    </CalculatorShell>
  );
}
