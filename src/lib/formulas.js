// Pure financial math helpers shared across calculators.
// All formulas are standard, publicly documented Indian financial-calculator formulas.

export function sipFutureValue(monthly, annualRatePct, months) {
  const i = annualRatePct / 100 / 12;
  if (i === 0) return monthly * months;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
}

export function lumpsumFutureValue(principal, annualRatePct, years) {
  return principal * Math.pow(1 + annualRatePct / 100, years);
}

export function emi(principal, annualRatePct, months) {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export function emiAmortization(principal, annualRatePct, months) {
  const r = annualRatePct / 100 / 12;
  const pay = emi(principal, annualRatePct, months);
  let balance = principal;
  const rows = [];
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    let principalPaid = pay - interest;
    if (m === months) principalPaid = balance; // absorb rounding
    balance = Math.max(0, balance - principalPaid);
    rows.push({ month: m, interest, principalPaid, balance, emi: pay });
  }
  return rows;
}

export function compoundInterest(principal, annualRatePct, years, timesPerYear = 1) {
  const amount = principal * Math.pow(1 + annualRatePct / 100 / timesPerYear, timesPerYear * years);
  return { amount, interest: amount - principal };
}

export function simpleInterest(principal, annualRatePct, years) {
  const interest = (principal * annualRatePct * years) / 100;
  return { interest, amount: principal + interest };
}

export function cagr(initial, final, years) {
  if (initial <= 0 || years <= 0) return 0;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}

// Newton-Raphson XIRR for arbitrary dated cash flows [{date: Date, amount: number}]
export function xirr(cashflows, guess = 0.1) {
  const t0 = cashflows[0].date;
  const days = (d) => (d - t0) / (1000 * 60 * 60 * 24);

  const npv = (rate) =>
    cashflows.reduce((sum, cf) => sum + cf.amount / Math.pow(1 + rate, days(cf.date) / 365), 0);

  const dnpv = (rate) =>
    cashflows.reduce((sum, cf) => {
      const t = days(cf.date) / 365;
      return sum - (t * cf.amount) / Math.pow(1 + rate, t + 1);
    }, 0);

  let rate = guess;
  for (let iter = 0; iter < 100; iter++) {
    const f = npv(rate);
    const d = dnpv(rate);
    if (Math.abs(d) < 1e-9) break;
    const next = rate - f / d;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - rate) < 1e-7) {
      rate = next;
      break;
    }
    rate = next;
  }
  return rate * 100;
}

export function ppfSchedule(yearlyInvestment, years, ratePct = 7.1) {
  let balance = 0;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    balance += yearlyInvestment;
    const interest = balance * (ratePct / 100);
    balance += interest;
    rows.push({ year: y, deposit: yearlyInvestment, interest, balance });
  }
  return rows;
}

export function rdMaturity(monthlyDeposit, annualRatePct, months, compoundingPerYear = 4) {
  const q = annualRatePct / 100 / compoundingPerYear;
  let total = 0;
  for (let k = 1; k <= months; k++) {
    const remainingMonths = months - k + 1;
    const periods = (remainingMonths / 12) * compoundingPerYear;
    total += monthlyDeposit * Math.pow(1 + q, periods);
  }
  return total;
}

export function newRegimeSlabs2025() {
  return [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 5 },
    { upto: 1200000, rate: 10 },
    { upto: 1600000, rate: 15 },
    { upto: 2000000, rate: 20 },
    { upto: 2400000, rate: 25 },
    { upto: Infinity, rate: 30 },
  ];
}

export function oldRegimeSlabs() {
  return [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 5 },
    { upto: 1000000, rate: 20 },
    { upto: Infinity, rate: 30 },
  ];
}

export function computeSlabTax(taxableIncome, slabs) {
  let remaining = taxableIncome;
  let prevCap = 0;
  let tax = 0;
  const breakup = [];
  for (const slab of slabs) {
    if (remaining <= 0) break;
    const band = Math.min(remaining, slab.upto - prevCap);
    if (band > 0) {
      const amt = (band * slab.rate) / 100;
      tax += amt;
      breakup.push({ from: prevCap, to: Math.min(taxableIncome, slab.upto), rate: slab.rate, amount: amt });
      remaining -= band;
    }
    prevCap = slab.upto;
  }
  return { tax, breakup };
}

export function incomeTax(grossIncome, regime = "new") {
  const stdDeduction = regime === "new" ? 75000 : 50000;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);
  const slabs = regime === "new" ? newRegimeSlabs2025() : oldRegimeSlabs();
  const { tax: preRebate, breakup } = computeSlabTax(taxableIncome, slabs);

  let rebate = 0;
  if (regime === "new" && taxableIncome <= 1200000) {
    rebate = Math.min(preRebate, 60000);
  } else if (regime === "old" && taxableIncome <= 500000) {
    rebate = Math.min(preRebate, 12500);
  }
  const taxAfterRebate = Math.max(0, preRebate - rebate);
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;
  return {
    taxableIncome,
    stdDeduction,
    preRebateTax: preRebate,
    rebate,
    taxAfterRebate,
    cess,
    totalTax,
    inHand: grossIncome - totalTax,
    breakup,
  };
}

export function gratuityAmount(lastDrawnSalary, yearsOfService, coveredUnderAct = true) {
  const years = coveredUnderAct ? Math.round(yearsOfService) : Math.floor(yearsOfService);
  const raw = coveredUnderAct
    ? (lastDrawnSalary * 15 * years) / 26
    : (lastDrawnSalary * 15 * years) / 30;
  return Math.min(raw, 2000000);
}

export function hraExemption({ basic, da = 0, hraReceived, rentPaid, metro }) {
  const basicDa = basic + da;
  const a = hraReceived;
  const b = Math.max(0, rentPaid - 0.1 * basicDa);
  const c = (metro ? 0.5 : 0.4) * basicDa;
  const exemption = Math.max(0, Math.min(a, b, c));
  return { exemption, taxableHra: Math.max(0, hraReceived - exemption), a, b, c };
}
