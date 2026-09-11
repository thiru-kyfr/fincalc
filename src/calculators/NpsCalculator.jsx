import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact } from "../lib/format";
import { sipFutureValue } from "../lib/formulas";

export default function NpsCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(10);
  const [annuityPct, setAnnuityPct] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);

  const result = useMemo(() => {
    const months = (60 - currentAge) * 12;
    const corpus = sipFutureValue(monthly, rate, Math.max(0, months));
    const invested = monthly * Math.max(0, months);
    const annuityCorpus = corpus * (annuityPct / 100);
    const lumpsum = corpus - annuityCorpus;
    const monthlyPension = (annuityCorpus * (annuityRate / 100)) / 12;
    return { corpus, invested, annuityCorpus, lumpsum, monthlyPension };
  }, [currentAge, monthly, rate, annuityPct, annuityRate]);

  return (
    <CalculatorShell
      title="NPS Calculator"
      category="Savings"
      description="Project your National Pension System corpus at 60 and estimate the monthly pension from annuitisation."
      inputs={
        <>
          <SliderInput label="Current Age" value={currentAge} min={18} max={59} step={1} suffix=" yrs" onChange={setCurrentAge} />
          <SliderInput label="Monthly Contribution" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} />
          <SliderInput label="Expected Return (Pre-retirement)" value={rate} min={1} max={15} step={0.5} suffix="%" onChange={setRate} />
          <SliderInput label="Annuity Purchase" value={annuityPct} min={40} max={100} step={5} suffix="%" onChange={setAnnuityPct} />
          <SliderInput label="Expected Annuity Rate" value={annuityRate} min={3} max={10} step={0.25} suffix="%" onChange={setAnnuityRate} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Corpus at 60" value={formatCompact(result.corpus)} highlight />
        <StatCard label="Lumpsum Withdrawal" value={formatCompact(result.lumpsum)} />
        <StatCard label="Monthly Pension" value={formatCompact(result.monthlyPension)} />
      </div>
      <Donut
        title="Corpus Breakdown"
        segments={[
          { label: "Invested", value: result.invested },
          { label: "Returns", value: Math.max(0, result.corpus - result.invested) },
        ]}
      />
      <Donut
        title="At Retirement"
        segments={[
          { label: "Lumpsum", value: result.lumpsum },
          { label: "Annuity Corpus", value: result.annuityCorpus },
        ]}
      />
    </CalculatorShell>
  );
}
