import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import { formatCompact } from "../lib/format";

const RATE = 8.2;
const TENURE_YEARS = 5;

export default function ScssCalculator() {
  const [investment, setInvestment] = useState(1500000);

  const result = useMemo(() => {
    const quarterlyPayout = (investment * (RATE / 100)) / 4;
    const totalInterest = quarterlyPayout * TENURE_YEARS * 4;
    return { quarterlyPayout, totalInterest };
  }, [investment]);

  return (
    <CalculatorShell
      title="SCSS Calculator"
      category="Savings"
      description={`Calculate quarterly payouts under the Senior Citizens Savings Scheme at ${RATE}% p.a. over a ${TENURE_YEARS}-year tenure.`}
      inputs={
        <>
          <div className="mb-6 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2.5 text-sm">
            <span className="text-[var(--text-secondary)]">Current SCSS Interest Rate</span>
            <div className="text-[var(--accent)] font-semibold">{RATE}% p.a. · {TENURE_YEARS}-yr tenure</div>
          </div>
          <SliderInput label="Deposit Amount" value={investment} min={1000} max={3000000} step={1000} prefix="₹" onChange={setInvestment} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Deposit" value={formatCompact(investment)} />
        <StatCard label="Quarterly Payout" value={formatCompact(result.quarterlyPayout)} highlight />
        <StatCard label="Total Interest (5 yrs)" value={formatCompact(result.totalInterest)} />
      </div>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-sm text-[var(--text-secondary)]">
        Max deposit is ₹30,00,000. Extendable in blocks of 3 years after maturity.
      </div>
    </CalculatorShell>
  );
}
