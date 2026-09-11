import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import { ToggleField } from "../components/ui/SelectField";
import { formatCompact } from "../lib/format";
import { gratuityAmount } from "../lib/formulas";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(30000);
  const [years, setYears] = useState(10);
  const [covered, setCovered] = useState(true);

  const result = useMemo(() => gratuityAmount(salary, years, covered), [salary, years, covered]);
  const capped = result >= 2000000;

  return (
    <CalculatorShell
      title="Gratuity Calculator"
      category="Tax"
      description="Calculate the gratuity payout you're entitled to on leaving a job, under the Payment of Gratuity Act."
      inputs={
        <>
          <SliderInput label="Last Drawn Salary (Basic + DA)" value={salary} min={5000} max={1000000} step={1000} prefix="₹" onChange={setSalary} />
          <SliderInput label="Years of Service" value={years} min={0} max={40} step={0.5} suffix=" yrs" onChange={setYears} />
          <ToggleField label="Covered under Gratuity Act" value={covered} onChange={setCovered} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Gratuity Amount" value={formatCompact(result)} highlight />
        <StatCard label="Formula Used" value={covered ? "15/26 × Salary × Years" : "15/30 × Salary × Years"} />
      </div>
      {capped && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-400">
          Amount capped at the statutory maximum of ₹20,00,000.
        </div>
      )}
    </CalculatorShell>
  );
}
