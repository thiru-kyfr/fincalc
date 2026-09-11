import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact } from "../lib/format";
import { sipFutureValue } from "../lib/formulas";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);

  const result = useMemo(() => {
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const yearsInRetirement = Math.max(1, lifeExpectancy - retireAge);
    const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    const realRate = (1 + postReturn / 100) / (1 + inflation / 100) - 1;
    const annualExpense = futureMonthlyExpense * 12;
    const corpus =
      realRate === 0
        ? annualExpense * yearsInRetirement
        : annualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate) * (1 + realRate);

    const months = yearsToRetire * 12;
    const i = preReturn / 100 / 12;
    const factor = i === 0 ? months : ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    const monthlySip = factor > 0 ? corpus / factor : 0;

    return { futureMonthlyExpense, corpus, monthlySip, yearsToRetire, yearsInRetirement };
  }, [currentAge, retireAge, lifeExpectancy, monthlyExpense, inflation, preReturn, postReturn]);

  return (
    <CalculatorShell
      title="Retirement Calculator"
      category="Savings"
      description="Estimate the corpus you'll need for a comfortable retirement, and the monthly SIP required to get there."
      inputs={
        <>
          <SliderInput label="Current Age" value={currentAge} min={18} max={60} step={1} suffix=" yrs" onChange={setCurrentAge} />
          <SliderInput label="Retirement Age" value={retireAge} min={currentAge + 1} max={75} step={1} suffix=" yrs" onChange={setRetireAge} />
          <SliderInput label="Life Expectancy" value={lifeExpectancy} min={retireAge + 1} max={100} step={1} suffix=" yrs" onChange={setLifeExpectancy} />
          <SliderInput label="Current Monthly Expense" value={monthlyExpense} min={5000} max={1000000} step={5000} prefix="₹" onChange={setMonthlyExpense} />
          <SliderInput label="Expected Inflation" value={inflation} min={1} max={15} step={0.5} suffix="%" onChange={setInflation} />
          <SliderInput label="Pre-retirement Return" value={preReturn} min={1} max={20} step={0.5} suffix="%" onChange={setPreReturn} />
          <SliderInput label="Post-retirement Return" value={postReturn} min={1} max={15} step={0.5} suffix="%" onChange={setPostReturn} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Monthly Expense at Retirement" value={formatCompact(result.futureMonthlyExpense)} />
        <StatCard label="Corpus Required" value={formatCompact(result.corpus)} highlight />
        <StatCard label="Monthly SIP Needed" value={formatCompact(result.monthlySip)} />
      </div>
      <Donut
        title="Timeline"
        segments={[
          { label: "Years to Retirement", value: result.yearsToRetire },
          { label: "Years in Retirement", value: result.yearsInRetirement },
        ]}
      />
    </CalculatorShell>
  );
}
