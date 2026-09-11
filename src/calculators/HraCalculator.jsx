import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import { ToggleField } from "../components/ui/SelectField";
import { formatCompact } from "../lib/format";
import { hraExemption } from "../lib/formulas";

export default function HraCalculator() {
  const [basic, setBasic] = useState(30000);
  const [da, setDa] = useState(0);
  const [hraReceived, setHraReceived] = useState(15000);
  const [rentPaid, setRentPaid] = useState(15000);
  const [metro, setMetro] = useState(true);

  const result = useMemo(
    () => hraExemption({ basic, da, hraReceived, rentPaid, metro }),
    [basic, da, hraReceived, rentPaid, metro]
  );

  return (
    <CalculatorShell
      title="HRA Calculator"
      category="Tax"
      description="Calculate how much of your House Rent Allowance is tax exempt — the least of three statutory limits."
      inputs={
        <>
          <SliderInput label="Basic Salary (Monthly)" value={basic} min={5000} max={500000} step={1000} prefix="₹" onChange={setBasic} />
          <SliderInput label="Dearness Allowance (Monthly)" value={da} min={0} max={100000} step={500} prefix="₹" onChange={setDa} />
          <SliderInput label="HRA Received (Monthly)" value={hraReceived} min={0} max={200000} step={500} prefix="₹" onChange={setHraReceived} />
          <SliderInput label="Rent Paid (Monthly)" value={rentPaid} min={0} max={200000} step={500} prefix="₹" onChange={setRentPaid} />
          <ToggleField label="Metro City" value={metro} onChange={setMetro} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="HRA Exemption" value={formatCompact(result.exemption)} highlight />
        <StatCard label="Taxable HRA" value={formatCompact(result.taxableHra)} />
        <StatCard label="HRA Received" value={formatCompact(hraReceived)} />
      </div>
      <Donut
        title="HRA Breakdown"
        segments={[
          { label: "Exempt", value: result.exemption },
          { label: "Taxable", value: result.taxableHra },
        ]}
      />
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-sm text-[var(--text-secondary)] space-y-1">
        <div>Exemption is the least of:</div>
        <div>• Actual HRA received: {formatCompact(result.a)}</div>
        <div>• Rent paid − 10% of Basic+DA: {formatCompact(result.b)}</div>
        <div>• {metro ? "50%" : "40%"} of Basic+DA: {formatCompact(result.c)}</div>
      </div>
    </CalculatorShell>
  );
}
