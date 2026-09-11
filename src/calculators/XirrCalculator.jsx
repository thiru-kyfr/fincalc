import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { NumberField, DateField } from "../components/ui/SelectField";
import { formatCompact, formatPercent } from "../lib/format";
import { xirr } from "../lib/formulas";

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export default function XirrCalculator() {
  const [investAmount, setInvestAmount] = useState(100000);
  const [investDate, setInvestDate] = useState(isoDaysAgo(3 * 365));
  const [redeemAmount, setRedeemAmount] = useState(145000);
  const [redeemDate, setRedeemDate] = useState(isoDaysAgo(0));

  const result = useMemo(() => {
    const d1 = new Date(investDate);
    const d2 = new Date(redeemDate);
    if (!(d1 instanceof Date) || isNaN(d1) || isNaN(d2) || d2 <= d1 || !investAmount || !redeemAmount) {
      return { rate: 0, gain: 0, valid: false };
    }
    const rate = xirr([
      { date: d1, amount: -Math.abs(investAmount) },
      { date: d2, amount: Math.abs(redeemAmount) },
    ]);
    return { rate, gain: redeemAmount - investAmount, valid: true };
  }, [investAmount, investDate, redeemAmount, redeemDate]);

  return (
    <CalculatorShell
      title="XIRR Calculator"
      category="Investment"
      description="Calculate the extended internal rate of return (XIRR) for an investment with a specific start and end date."
      inputs={
        <>
          <NumberField label="Investment Amount" prefix="₹" value={investAmount} onChange={setInvestAmount} />
          <DateField label="Investment Date" value={investDate} onChange={setInvestDate} />
          <NumberField label="Redemption Amount" prefix="₹" value={redeemAmount} onChange={setRedeemAmount} />
          <DateField label="Redemption Date" value={redeemDate} onChange={setRedeemDate} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Absolute Gain" value={formatCompact(result.gain)} />
        <StatCard label="XIRR" value={result.valid ? formatPercent(result.rate, 2) : "—"} highlight />
        <StatCard
          label="Holding Period"
          value={
            result.valid
              ? `${((new Date(redeemDate) - new Date(investDate)) / (1000 * 60 * 60 * 24 * 365)).toFixed(2)} yrs`
              : "—"
          }
        />
      </div>
      {!result.valid && (
        <div className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          Redemption date must be after the investment date.
        </div>
      )}
      <Donut
        title="Value Breakdown"
        segments={[
          { label: "Invested", value: investAmount },
          { label: "Gain", value: Math.max(0, result.gain) },
        ]}
      />
    </CalculatorShell>
  );
}
