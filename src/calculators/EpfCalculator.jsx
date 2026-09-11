import { useMemo, useState } from "react";
import CalculatorShell from "../components/ui/CalculatorShell";
import SliderInput from "../components/ui/SliderInput";
import StatCard from "../components/ui/StatCard";
import Donut from "../components/ui/Donut";
import GrowthChart from "../components/ui/GrowthChart";
import { formatCompact } from "../lib/format";

const RATE = 8.25;
const EPS_WAGE_CEILING = 15000;
const EPS_RATE = 0.0833;
const EMPLOYEE_RATE = 0.12;

function epfSchedule({ basic, currentAge, retireAge, annualIncrement, existingBalance }) {
  let balance = existingBalance;
  let salary = basic;
  let totalEmployee = 0;
  let totalEmployer = 0;
  const series = [];
  for (let age = currentAge + 1; age <= retireAge; age++) {
    const eps = Math.min(EPS_RATE * salary, EPS_RATE * EPS_WAGE_CEILING);
    const employerEpf = Math.max(0, salary * EMPLOYEE_RATE - eps);
    const employeeEpf = salary * EMPLOYEE_RATE;
    const monthlyTotal = employeeEpf + employerEpf;
    for (let m = 0; m < 12; m++) {
      balance += monthlyTotal;
      balance *= 1 + RATE / 100 / 12;
    }
    totalEmployee += employeeEpf * 12;
    totalEmployer += employerEpf * 12;
    series.push({ label: `Age ${age}`, balance });
    salary *= 1 + annualIncrement / 100;
  }
  return { balance, totalEmployee, totalEmployer, series };
}

export default function EpfCalculator() {
  const [basic, setBasic] = useState(25000);
  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(58);
  const [increment, setIncrement] = useState(8);
  const [existingBalance, setExistingBalance] = useState(0);

  const result = useMemo(
    () => epfSchedule({ basic, currentAge, retireAge, annualIncrement: increment, existingBalance }),
    [basic, currentAge, retireAge, increment, existingBalance]
  );

  const totalContribution = result.totalEmployee + result.totalEmployer + existingBalance;
  const interest = result.balance - totalContribution;

  return (
    <CalculatorShell
      title="EPF Calculator"
      category="Savings"
      description={`Estimate your Employees' Provident Fund corpus at retirement, using the current ${RATE}% p.a. EPF interest rate.`}
      inputs={
        <>
          <SliderInput label="Basic Salary + DA (Monthly)" value={basic} min={5000} max={300000} step={1000} prefix="₹" onChange={setBasic} />
          <SliderInput label="Current Age" value={currentAge} min={18} max={57} step={1} suffix=" yrs" onChange={setCurrentAge} />
          <SliderInput label="Retirement Age" value={retireAge} min={currentAge + 1} max={60} step={1} suffix=" yrs" onChange={setRetireAge} />
          <SliderInput label="Annual Salary Increment" value={increment} min={0} max={20} step={0.5} suffix="%" onChange={setIncrement} />
          <SliderInput label="Existing EPF Balance" value={existingBalance} min={0} max={5000000} step={5000} prefix="₹" onChange={setExistingBalance} />
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Contribution" value={formatCompact(totalContribution)} />
        <StatCard label="Interest Earned" value={formatCompact(interest)} />
        <StatCard label="Corpus at Retirement" value={formatCompact(result.balance)} highlight />
      </div>
      <Donut
        title="Breakdown"
        segments={[
          { label: "Employee Share", value: result.totalEmployee },
          { label: "Employer Share", value: result.totalEmployer },
          { label: "Interest", value: Math.max(0, interest) },
        ]}
      />
      <GrowthChart title="Corpus Growth" series={result.series} lines={[{ key: "balance", name: "Balance", color: "#8b5cf6" }]} />
    </CalculatorShell>
  );
}
