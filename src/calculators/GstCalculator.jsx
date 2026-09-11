import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import { SegmentedField } from "../components/ui/SelectField";
import DataTable from "../components/ui/DataTable";
import { formatCompact, formatCurrency } from "../lib/format";

const RATES = [0, 5, 12, 18, 28];

export default function GstCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState("exclusive");

  const result = useMemo(() => {
    let base, gstAmount, total;
    if (mode === "exclusive") {
      base = amount;
      gstAmount = (amount * rate) / 100;
      total = base + gstAmount;
    } else {
      total = amount;
      base = amount / (1 + rate / 100);
      gstAmount = total - base;
    }
    return { base, gstAmount, total, cgst: gstAmount / 2, sgst: gstAmount / 2 };
  }, [amount, rate, mode]);

  return (
    <CalculatorShell
      title="GST Calculator"
      category="Tax"
      description="Add or remove GST from an amount at any of the standard slab rates, with a CGST/SGST split."
      inputs={
        <>
          <SliderInput label="Amount" value={amount} min={1} max={1000000} step={100} prefix="₹" onChange={setAmount} />
          <SegmentedField label="GST Rate" value={rate} onChange={(v) => setRate(Number(v))} options={RATES.map((r) => ({ label: `${r}%`, value: r }))} />
          <SegmentedField
            label="Amount Type"
            value={mode}
            onChange={setMode}
            options={[
              { label: "Exclusive", value: "exclusive" },
              { label: "Inclusive", value: "inclusive" },
            ]}
          />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="GST Amount" value={formatCompact(result.gstAmount)} />
        <StatCard label="Total Payable" value={formatCompact(result.total)} highlight />
      </div>
      <DataTable
        title="Breakdown"
        columns={["Component", "Amount"]}
        rows={[
          ["Base Amount", formatCurrency(result.base)],
          [`CGST (${rate / 2}%)`, formatCurrency(result.cgst)],
          [`SGST (${rate / 2}%)`, formatCurrency(result.sgst)],
          ["Total GST", formatCurrency(result.gstAmount)],
          ["Total Payable", formatCurrency(result.total)],
        ]}
      />
    </CalculatorShell>
  );
}
