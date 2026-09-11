import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact, formatCurrency } from "../lib/format";
import { APY_TABLE, APY_RETURN_CORPUS, APY_PENSION_OPTIONS } from "../lib/apyTable";

export default function ApyCalculator() {
  const [age, setAge] = useState(30);
  const [pension, setPension] = useState(5000);

  const result = useMemo(() => {
    const idx = APY_PENSION_OPTIONS.indexOf(pension);
    const clampedAge = Math.min(40, Math.max(18, age));
    const monthly = APY_TABLE[clampedAge]?.[idx] ?? 0;
    const months = (60 - clampedAge) * 12;
    const totalContribution = monthly * months;
    const returnCorpus = APY_RETURN_CORPUS[pension];
    return { monthly, months, totalContribution, returnCorpus };
  }, [age, pension]);

  return (
    <CalculatorShell
      title="APY Calculator"
      category="Savings"
      description="Find your required monthly contribution under Atal Pension Yojana, based on the official PFRDA chart."
      inputs={
        <>
          <SliderInput label="Current Age" value={age} min={18} max={40} step={1} suffix=" yrs" onChange={setAge} />
          <SegmentedField
            label="Desired Monthly Pension"
            value={pension}
            onChange={(v) => setPension(Number(v))}
            options={APY_PENSION_OPTIONS.map((p) => ({ label: `₹${p}`, value: p }))}
          />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Monthly Contribution" value={formatCurrency(result.monthly)} highlight />
        <StatCard label="Contribution Period" value={`${result.months} months (till 60)`} />
        <StatCard label="Total Contribution" value={formatCompact(result.totalContribution)} />
      </div>
      <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5 text-sm text-gray-400">
        On reaching 60, you'll receive a guaranteed pension of{" "}
        <span className="text-gray-100 font-medium">₹{pension.toLocaleString("en-IN")}/month</span> for life. On death,
        your spouse or nominee receives the return-of-corpus amount of{" "}
        <span className="text-gray-100 font-medium">{formatCompact(result.returnCorpus)}</span>.
      </div>
    </CalculatorShell>
  );
}
