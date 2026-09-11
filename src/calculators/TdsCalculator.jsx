import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import SelectField, { ToggleField } from "../components/ui/SelectField";
import { formatCompact, formatCurrency } from "../lib/format";

const SECTIONS = [
  { value: "194A", label: "Interest on FD/RD (194A)", rate: 10, threshold: 40000 },
  { value: "194I", label: "Rent (194I)", rate: 10, threshold: 240000 },
  { value: "194J", label: "Professional Fees (194J)", rate: 10, threshold: 30000 },
  { value: "194H", label: "Commission / Brokerage (194H)", rate: 5, threshold: 15000 },
  { value: "194C", label: "Contractor Payment (194C)", rate: 1, threshold: 30000 },
  { value: "194", label: "Dividend (194)", rate: 10, threshold: 5000 },
];

export default function TdsCalculator() {
  const [section, setSection] = useState("194A");
  const [amount, setAmount] = useState(100000);
  const [panAvailable, setPanAvailable] = useState(true);

  const result = useMemo(() => {
    const s = SECTIONS.find((x) => x.value === section);
    const rate = panAvailable ? s.rate : 20;
    const applicable = amount > s.threshold;
    const tds = applicable ? (amount * rate) / 100 : 0;
    return { s, rate, applicable, tds, netPayment: amount - tds };
  }, [section, amount, panAvailable]);

  return (
    <CalculatorShell
      title="TDS Calculator"
      category="Tax"
      description="Estimate TDS deduction for common payment sections, based on standard rates and thresholds."
      inputs={
        <>
          <SelectField label="Payment Type" value={section} onChange={setSection} options={SECTIONS} />
          <SliderInput label="Payment Amount" value={amount} min={0} max={2000000} step={1000} prefix="₹" onChange={setAmount} />
          <ToggleField label="PAN Available" value={panAvailable} onChange={setPanAvailable} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="TDS Rate" value={`${result.rate}%`} />
        <StatCard label="TDS Amount" value={formatCompact(result.tds)} highlight />
        <StatCard label="Net Payment" value={formatCompact(result.netPayment)} />
      </div>
      <div className="bg-[#15161d] border border-[#2b2d3a] rounded-xl p-5 text-sm text-gray-400">
        Threshold for {result.s.label}: {formatCurrency(result.s.threshold)}.{" "}
        {result.applicable
          ? "Payment exceeds threshold — TDS is applicable."
          : "Payment is within threshold — no TDS applicable."}
        {!panAvailable && " No PAN on record — TDS charged at the flat 20% rate."}
      </div>
    </CalculatorShell>
  );
}
