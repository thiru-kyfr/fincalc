import EmiBase from "./EmiBase";

export default function EmiCalculator() {
  return (
    <EmiBase
      title="EMI Calculator"
      description="Calculate EMI on your loans — home loan, car loan or personal loan — with a full amortisation schedule."
      defaults={{ amount: 1000000, amountMin: 50000, amountMax: 10000000, amountStep: 10000, rate: 8.5, rateMin: 1, rateMax: 24, years: 20, yearsMin: 1, yearsMax: 30 }}
    />
  );
}
