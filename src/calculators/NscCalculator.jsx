import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { formatCompact } from "../lib/format";
import { compoundInterest } from "../lib/formulas";

const RATE = 7.7;
const TENURE_YEARS = 5;

export default function NscCalculator() {
  const [amount, setAmount] = useState(100000);

  const result = useMemo(() => compoundInterest(amount, RATE, TENURE_YEARS, 1), [amount]);

  return (
    <CalculatorShell
      title="NSC Calculator"
      category="Savings"
      description={`Calculate maturity value under the National Savings Certificate scheme — ${RATE}% p.a., compounded annually over a fixed ${TENURE_YEARS}-year tenure.`}
      inputs={
        <>
          <div className="mb-6 rounded-lg bg-[#1a1b23] border border-[#2b2d3a] px-3 py-2.5 text-sm">
            <span className="text-gray-400">Current NSC Interest Rate</span>
            <div className="text-violet-300 font-semibold">{RATE}% p.a. · {TENURE_YEARS}-yr lock-in</div>
          </div>
          <SliderInput label="Investment Amount" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Amount Invested" value={formatCompact(amount)} />
        <StatCard label="Interest Earned" value={formatCompact(result.interest)} />
        <StatCard label="Maturity Value" value={formatCompact(result.amount)} highlight />
      </div>
      <Donut
        title="Breakdown"
        segments={[
          { label: "Invested", value: amount },
          { label: "Interest", value: result.interest },
        ]}
      />
    </CalculatorShell>
  );
}
