import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import { NumberField, SegmentedField } from "../components/ui/SelectField";
import StatCard from "../components/ui/StatCard";
import { formatCompact } from "../lib/format";

const SEGMENTS = [
  { label: "Equity Delivery", value: "delivery", marginPct: 20, note: "~5x leverage (20% margin, peak margin rules)" },
  { label: "Equity Intraday", value: "intraday", marginPct: 4, note: "~25x leverage (4% margin)" },
  { label: "F&O Futures", value: "futures", marginPct: 12, note: "~8x leverage (SPAN + exposure, approx.)" },
  { label: "F&O Options (Buy)", value: "options-buy", marginPct: 100, note: "Full premium paid upfront" },
  { label: "F&O Options (Sell)", value: "options-sell", marginPct: 15, note: "~7x leverage (approx. margin for writing)" },
];

export default function MarginCalculator() {
  const [price, setPrice] = useState(1000);
  const [qty, setQty] = useState(100);
  const [segment, setSegment] = useState("delivery");

  const result = useMemo(() => {
    const s = SEGMENTS.find((x) => x.value === segment);
    const orderValue = price * qty;
    const marginRequired = orderValue * (s.marginPct / 100);
    const leverage = marginRequired > 0 ? orderValue / marginRequired : 0;
    return { s, orderValue, marginRequired, leverage };
  }, [price, qty, segment]);

  return (
    <CalculatorShell
      title="Margin Calculator"
      category="Trading"
      description="Estimate margin required for delivery, intraday and F&O trades (typical broker margin approximations)."
      inputs={
        <>
          <SegmentedField label="Segment" value={segment} onChange={setSegment} options={SEGMENTS} />
          <NumberField label="Price per Share" prefix="₹" value={price} onChange={setPrice} />
          <NumberField label="Quantity" value={qty} onChange={setQty} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Order Value" value={formatCompact(result.orderValue)} />
        <StatCard label="Margin Required" value={formatCompact(result.marginRequired)} highlight />
        <StatCard label="Effective Leverage" value={`${result.leverage.toFixed(1)}x`} />
      </div>
      <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5 text-sm text-gray-400">
        {result.s.label}: {result.s.note}. Actual margin varies by broker, stock volatility (VaR + ELM) and SPAN
        requirements — treat this as an estimate.
      </div>
    </CalculatorShell>
  );
}
