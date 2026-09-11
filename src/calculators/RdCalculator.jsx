import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact } from "../lib/format";
import { rdMaturity } from "../lib/formulas";

export default function RdCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(36);

  const result = useMemo(() => {
    const maturity = rdMaturity(monthly, rate, months);
    const invested = monthly * months;
    return { maturity, invested, interest: maturity - invested };
  }, [monthly, rate, months]);

  return (
    <CalculatorShell
      title="RD Calculator"
      category="Savings"
      description="Check maturity value on a Recurring Deposit, compounded quarterly like most Indian banks."
      inputs={
        <>
          <SliderInput label="Monthly Deposit" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} />
          <SliderInput label="Interest Rate" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} />
          <SliderInput label="Tenure" value={months} min={6} max={120} step={1} suffix=" mo" onChange={setMonths} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Invested" value={formatCompact(result.invested)} />
        <StatCard label="Interest Earned" value={formatCompact(result.interest)} />
        <StatCard label="Maturity Value" value={formatCompact(result.maturity)} highlight />
      </div>
      <Donut
        title="Breakdown"
        segments={[
          { label: "Invested", value: result.invested },
          { label: "Interest", value: result.interest },
        ]}
      />
    </CalculatorShell>
  );
}
