import EmiBase from "./EmiBase";

export default function CarLoanEmiCalculator() {
  return (
    <EmiBase
      title="Car Loan EMI Calculator"
      description="Calculate your monthly car loan EMI and total interest cost over the loan tenure."
      defaults={{ amount: 700000, amountMin: 100000, amountMax: 5000000, amountStep: 10000, rate: 9, rateMin: 7, rateMax: 16, years: 5, yearsMin: 1, yearsMax: 7 }}
    />
  );
}
