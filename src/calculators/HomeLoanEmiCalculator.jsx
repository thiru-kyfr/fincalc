import EmiBase from "./EmiBase";

export default function HomeLoanEmiCalculator() {
  return (
    <EmiBase
      title="Home Loan EMI Calculator"
      description="Calculate EMI and amortisation for a home loan of any size or tenure."
      defaults={{ amount: 4000000, amountMin: 500000, amountMax: 100000000, amountStep: 50000, rate: 8.5, rateMin: 6, rateMax: 14, years: 20, yearsMin: 5, yearsMax: 30 }}
    />
  );
}
