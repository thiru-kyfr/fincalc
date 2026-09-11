import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import { formatCompact } from "../lib/format";

const RATE = 7.4;
const TENURE_YEARS = 5;

export default function PostOfficeMisCalculator() {
  const [investment, setInvestment] = useState(900000);

  const result = useMemo(() => {
    const monthlyIncome = (investment * (RATE / 100)) / 12;
    const totalInterest = monthlyIncome * TENURE_YEARS * 12;
    return { monthlyIncome, totalInterest };
  }, [investment]);

  return (
    <CalculatorShell
      title="Post Office MIS"
      category="Savings"
      description={`Calculate monthly income from a Post Office Monthly Income Scheme deposit at ${RATE}% p.a. over a ${TENURE_YEARS}-year tenure.`}
      inputs={
        <>
          <div className="mb-6 rounded-lg bg-[#1a1b23] border border-[#2b2d3a] px-3 py-2.5 text-sm">
            <span className="text-gray-400">Current POMIS Interest Rate</span>
            <div className="text-violet-300 font-semibold">{RATE}% p.a. · {TENURE_YEARS}-yr tenure</div>
          </div>
          <SliderInput label="Deposit Amount" value={investment} min={1000} max={1500000} step={1000} prefix="₹" onChange={setInvestment} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Deposit" value={formatCompact(investment)} />
        <StatCard label="Monthly Income" value={formatCompact(result.monthlyIncome)} highlight />
        <StatCard label="Total Interest (5 yrs)" value={formatCompact(result.totalInterest)} />
      </div>
      <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5 text-sm text-gray-400">
        Max deposit is ₹9,00,000 for a single account and ₹15,00,000 for a joint account. Principal is returned in
        full at maturity.
      </div>
    </CalculatorShell>
  );
}
