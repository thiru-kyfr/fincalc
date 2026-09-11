import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import DataTable from "../components/ui/DataTable";
import { SegmentedField } from "../components/ui/SelectField";
import { formatCompact, formatCurrency } from "../lib/format";
import { incomeTax } from "../lib/formulas";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(1000000);
  const [basicPct, setBasicPct] = useState(50);
  const [proTaxMonthly, setProTaxMonthly] = useState(200);
  const [regime, setRegime] = useState("new");

  const result = useMemo(() => {
    const basic = ctc * (basicPct / 100);
    const hra = basic * 0.5;
    const employerPf = basic * 0.12;
    const employeePf = basic * 0.12;
    const gratuity = basic * 0.0481;
    const gross = Math.max(0, ctc - employerPf - gratuity);
    const specialAllowance = Math.max(0, gross - basic - hra);
    const proTaxAnnual = proTaxMonthly * 12;

    const taxableForRegime = regime === "old" ? gross - employeePf : gross;
    const tax = incomeTax(Math.max(0, taxableForRegime), regime).totalTax;

    const deductions = employeePf + proTaxAnnual + tax;
    const netAnnual = gross - deductions;

    return {
      basic,
      hra,
      specialAllowance,
      employerPf,
      employeePf,
      gratuity,
      gross,
      proTaxAnnual,
      tax,
      deductions,
      netAnnual,
      netMonthly: netAnnual / 12,
    };
  }, [ctc, basicPct, proTaxMonthly, regime]);

  return (
    <CalculatorShell
      title="Salary Calculator"
      category="Tax"
      description="Break down your CTC into gross salary, deductions and take-home pay."
      inputs={
        <>
          <SliderInput label="Annual CTC" value={ctc} min={200000} max={10000000} step={10000} prefix="₹" onChange={setCtc} />
          <SliderInput label="Basic Salary (% of CTC)" value={basicPct} min={30} max={60} step={1} suffix="%" onChange={setBasicPct} />
          <SliderInput label="Professional Tax (Monthly)" value={proTaxMonthly} min={0} max={2500} step={50} prefix="₹" onChange={setProTaxMonthly} />
          <SegmentedField
            label="Tax Regime"
            value={regime}
            onChange={setRegime}
            options={[
              { label: "New Regime", value: "new" },
              { label: "Old Regime", value: "old" },
            ]}
          />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Gross Salary" value={formatCompact(result.gross)} />
        <StatCard label="Total Deductions" value={formatCompact(result.deductions)} />
        <StatCard label="Take Home (Monthly)" value={formatCompact(result.netMonthly)} highlight />
      </div>
      <Donut
        title="Salary Breakdown"
        segments={[
          { label: "Basic", value: result.basic },
          { label: "HRA", value: result.hra },
          { label: "Special Allowance", value: result.specialAllowance },
        ]}
      />
      <DataTable
        title="Annual Breakdown"
        columns={["Component", "Amount"]}
        rows={[
          ["Basic Salary", formatCurrency(result.basic)],
          ["HRA", formatCurrency(result.hra)],
          ["Special Allowance", formatCurrency(result.specialAllowance)],
          ["Employer PF Contribution", formatCurrency(result.employerPf)],
          ["Gratuity Provision", formatCurrency(result.gratuity)],
          ["Gross Salary", formatCurrency(result.gross)],
          ["Employee PF Deduction", "-" + formatCurrency(result.employeePf)],
          ["Professional Tax", "-" + formatCurrency(result.proTaxAnnual)],
          ["Income Tax", "-" + formatCurrency(result.tax)],
          ["Net Take Home (Annual)", formatCurrency(result.netAnnual)],
        ]}
      />
    </CalculatorShell>
  );
}
