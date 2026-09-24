// Explanatory content (about, formula, FAQs) shown below each calculator.
// Keep formulas in sync with src/lib/formulas.js and the individual calculator components.

export const CALCULATOR_CONTENT = {
  // ---------- Investment ----------

  sip: {
    about: [
      "A Systematic Investment Plan (SIP) lets you invest a fixed amount into a mutual fund every month instead of investing a lump sum at once. Each instalment buys units at that month's price, which averages out market ups and downs over time — a habit known as rupee cost averaging.",
      "This calculator projects the future value of a SIP using a fixed expected annual return, compounded monthly. Actual mutual fund returns vary with the market, so treat the result as an estimate for planning, not a guarantee.",
    ],
    formula: {
      expression: "FV = P × [((1 + r)ⁿ − 1) / r] × (1 + r)",
      notes:
        "P is the monthly investment, r is the monthly rate of return (annual rate ÷ 12 ÷ 100), and n is the total number of months invested.",
    },
    faqs: [
      {
        q: "Is the SIP return shown here guaranteed?",
        a: "No. This calculator assumes a fixed annual return you enter, compounded every month. Real mutual funds are market-linked, so actual returns will fluctuate year to year — use a conservative rate (historically 10–12% for equity funds over long periods) for planning.",
      },
      {
        q: "What's a reasonable expected return to assume?",
        a: "It depends on the fund category. Equity mutual funds have historically delivered 10–14% annualised over long (10+ year) periods in India, while debt funds are closer to 6–8%. Use a rate that matches the type of fund you're actually investing in.",
      },
      {
        q: "Can I pause or stop a SIP without penalty?",
        a: "Yes, most SIPs in India can be paused or stopped anytime without a penalty from the fund house, though you may lose out on rupee cost averaging and compounding if you stop early.",
      },
    ],
  },

  lumpsum: {
    about: [
      "A lumpsum investment puts your entire amount to work on day one, so it compounds for the full duration you choose — unlike a SIP, where later instalments have less time to grow.",
      "This calculator compounds your investment annually at a fixed expected rate of return. It's useful for comparing how a one-time investment (a bonus, maturity payout, or inheritance) could grow versus spreading it out.",
    ],
    formula: {
      expression: "FV = P × (1 + r)ⁿ",
      notes: "P is the principal invested, r is the expected annual rate of return, and n is the number of years invested.",
    },
    faqs: [
      {
        q: "Lumpsum or SIP — which grows more?",
        a: "Mathematically, a lumpsum invested at the start of a rising market outperforms an equivalent SIP, because every rupee has more time to compound. In practice, SIPs reduce timing risk since you're not betting the entire amount on a single entry point.",
      },
      {
        q: "Does compounding frequency change the result much?",
        a: "For most mutual fund and equity projections, annual compounding is the standard convention and gives a close approximation. For fixed-income products like FDs, compounding frequency (monthly/quarterly) does make a noticeable difference — use the FD calculator for that.",
      },
      {
        q: "What return rate should I use for a lumpsum equity investment?",
        a: "A commonly used long-term planning assumption is 10–12% per annum for diversified equity funds in India, though actual returns depend entirely on the market and the specific fund.",
      },
    ],
  },

  swp: {
    about: [
      "A Systematic Withdrawal Plan (SWP) is the reverse of a SIP: instead of investing regularly, you withdraw a fixed amount from an existing corpus every month while the remaining balance stays invested and keeps earning returns.",
      "This calculator simulates your balance month by month — each month it grows by your expected rate of return, then your fixed withdrawal is deducted — so you can see how long a corpus lasts, or how much is left over after a chosen period.",
    ],
    formula: {
      expression: "Balanceₘ = Balanceₘ₋₁ × (1 + r) − W",
      notes:
        "Each month, the previous balance grows by the monthly rate of return r (annual rate ÷ 12 ÷ 100), then the fixed monthly withdrawal W is subtracted. This repeats until the tenure ends or the balance reaches zero.",
    },
    faqs: [
      {
        q: "What happens if my withdrawal is larger than my returns?",
        a: "If you withdraw more each month than the corpus earns, the balance shrinks over time and can run out before your chosen tenure ends — this calculator stops the simulation at zero rather than showing a negative balance.",
      },
      {
        q: "Is money withdrawn through an SWP taxed?",
        a: "Each SWP withdrawal is treated as a partial redemption of mutual fund units, so it's taxed as capital gains (short- or long-term depending on holding period) on the gain portion only, not the entire withdrawal.",
      },
      {
        q: "How is an SWP different from a mutual fund's dividend option?",
        a: "A dividend (IDCW) payout is declared by the fund and isn't guaranteed or fixed in amount, while an SWP lets you choose a fixed amount and frequency to withdraw yourself, regardless of whether the fund pays a dividend.",
      },
    ],
  },

  "mf-returns": {
    about: [
      "When you check a mutual fund investment, the app usually shows a single return percentage — but that number alone doesn't tell you whether it's a good return for the time you stayed invested.",
      "This calculator converts your invested amount and current value into both absolute return (the plain percentage gain) and annualised return (CAGR), which accounts for how long you've held the investment and lets you compare it fairly against other options.",
    ],
    formula: {
      expression: "Absolute Return % = (Current − Invested) ÷ Invested × 100 · Annualised = (Current/Invested)^(1/years) − 1",
      notes:
        "Absolute return ignores time — a 50% gain over 1 year and over 5 years both show as 50%. Annualised return (CAGR) spreads that gain evenly across the years, which is why it's lower for longer holding periods.",
    },
    faqs: [
      {
        q: "Why is my annualised return lower than my absolute return?",
        a: "Absolute return doesn't account for time, but CAGR does — the longer you've held the investment, the more a fixed total gain gets 'spread out' per year, so the annualised figure will always be lower than absolute return whenever you've held for more than one year.",
      },
      {
        q: "Should I use CAGR or XIRR to check my mutual fund returns?",
        a: "CAGR works for a single lumpsum investment held for a fixed period. If you invested through a SIP or made multiple purchases/redemptions on different dates, use the XIRR calculator instead — it correctly accounts for the timing of each cash flow.",
      },
      {
        q: "Does this calculator account for dividends or SIP instalments?",
        a: "No — it assumes a single investment made once and a single current value, which is best for lumpsum investments. For SIPs or multiple transactions, XIRR gives a more accurate annualised figure.",
      },
    ],
  },

  "step-up-sip": {
    about: [
      "A step-up (or 'top-up') SIP increases your monthly investment by a fixed percentage every year, typically in line with salary increments. Because more money goes in during the later, larger years, the final corpus is meaningfully higher than a flat SIP of the same starting amount.",
      "This calculator increases your monthly contribution by your chosen step-up percentage at the start of each year, while the growing balance compounds monthly at your expected rate of return.",
    ],
    formula: {
      expression: "SIPₙ = SIP₁ × (1 + step-up%)ⁿ⁻¹, compounded monthly at r within each year",
      notes:
        "The monthly instalment for year n is the previous year's instalment increased by your step-up percentage. Within each year, the running balance compounds monthly at the expected rate of return.",
    },
    faqs: [
      {
        q: "What's a realistic step-up percentage to use?",
        a: "10% is a common assumption, roughly matching typical annual salary increments in India. Even a modest 5–10% step-up can meaningfully increase your final corpus compared to a flat SIP over 10+ years.",
      },
      {
        q: "How much more does stepping up actually add?",
        a: "It varies by tenure and step-up rate, but over long horizons (15–20 years) a 10% annual step-up can grow your final corpus by 40–60% or more compared to a flat SIP of the same starting amount, since your contribution — and the base it compounds on — keeps growing.",
      },
      {
        q: "Can I change or stop the step-up later?",
        a: "Yes. Most fund houses let you modify or cancel a step-up (top-up) SIP instruction at any time; it's a feature layered on top of a regular SIP mandate, not a separate binding contract.",
      },
    ],
  },

  cagr: {
    about: [
      "Compound Annual Growth Rate (CAGR) tells you the smoothed, year-over-year growth rate that would take an investment from its starting value to its ending value over a given period — even though actual year-to-year growth is rarely smooth.",
      "It's the standard way to compare returns across investments of different types and durations, since it strips out volatility and expresses growth as a single annualised percentage.",
    ],
    formula: {
      expression: "CAGR = [(Final Value ÷ Initial Value)^(1/n) − 1] × 100",
      notes: "n is the number of years between the initial and final value. CAGR assumes smooth compounding and doesn't reflect any volatility along the way.",
    },
    faqs: [
      {
        q: "Can CAGR be negative?",
        a: "Yes — if your final value is lower than your initial value, CAGR will be negative, correctly reflecting an overall loss annualised across the period.",
      },
      {
        q: "How is CAGR different from average annual return?",
        a: "A simple average of yearly returns can overstate actual growth because it ignores compounding and the order of gains/losses. CAGR instead measures the single constant rate that actually gets you from the start value to the end value.",
      },
      {
        q: "Does CAGR work if I added money partway through?",
        a: "No — CAGR only works cleanly for a single initial investment and a single final value. If you added or withdrew money at different times, use XIRR instead, since it accounts for the timing and size of each cash flow.",
      },
    ],
  },

  xirr: {
    about: [
      "XIRR (Extended Internal Rate of Return) calculates the annualised return of an investment with irregular cash flows on different dates — for example, a single investment followed by a single redemption on an arbitrary later date, or several SIP instalments and a final withdrawal.",
      "Unlike CAGR, which assumes one clean start and end date exactly one or more full years apart, XIRR works out the rate that makes the present value of every cash flow (in and out) net to zero, based on the actual number of days between them.",
    ],
    formula: {
      expression: "Σ [CFᵢ ÷ (1 + r)^(dᵢ/365)] = 0, solved for r",
      notes:
        "Each cash flow CFᵢ occurs dᵢ days after the first one. Investments are entered as negative amounts and redemptions as positive; the calculator solves iteratively (Newton-Raphson) for the annualised rate r that balances the equation.",
    },
    faqs: [
      {
        q: "When should I use XIRR instead of CAGR?",
        a: "Use XIRR whenever you have more than two cash flows, or when the flows don't fall on a clean whole-year boundary — for example, SIP instalments across many dates, or a lumpsum invested and redeemed on arbitrary dates. CAGR is only accurate for a single investment and a single exit.",
      },
      {
        q: "Why do investments need to be entered as negative amounts?",
        a: "XIRR treats cash flowing out of your pocket (an investment) as negative and cash flowing back to you (a redemption) as positive — this sign convention is what lets the formula solve for a single rate that reconciles both.",
      },
      {
        q: "Why might an XIRR calculation fail to produce a result?",
        a: "The underlying method (Newton-Raphson) can fail to converge if the cash flows are inconsistent — for example, if there's no investment before a redemption, or the dates and amounts don't represent a realistic gain or loss.",
      },
    ],
  },

  roi: {
    about: [
      "Return on Investment (ROI) is the simplest way to measure how much an investment has gained or lost relative to what you put in, expressed as a plain percentage with no adjustment for time.",
      "This calculator also shows an annualised (CAGR) figure alongside the plain ROI, since a 50% return over one year is a very different outcome from a 50% return over ten years.",
    ],
    formula: {
      expression: "ROI % = (Amount Returned − Amount Invested) ÷ Amount Invested × 100",
      notes: "The annualised figure alongside it uses the CAGR formula, factoring in the number of years the investment was held.",
    },
    faqs: [
      {
        q: "Is ROI the same as CAGR?",
        a: "No. ROI is a plain percentage gain with no time dimension, while CAGR annualises that gain over the holding period. A high ROI over a long period can still be a mediocre annualised return.",
      },
      {
        q: "Can ROI be used to compare two different investments?",
        a: "Only if they were held for the same length of time — otherwise, compare their annualised (CAGR) figures instead, since a longer holding period naturally allows for a higher plain ROI.",
      },
      {
        q: "Does ROI account for fees, taxes, or inflation?",
        a: "No — this calculator computes a gross ROI based only on amount invested versus amount returned. Real-world returns will be lower after transaction costs, capital gains tax, and inflation.",
      },
    ],
  },

  // ---------- Savings ----------

  ssy: {
    about: [
      "Sukanya Samriddhi Yojana (SSY) is a government savings scheme for a girl child's future education and marriage expenses, opened in her name by a parent or guardian before she turns 10.",
      "The account accepts deposits for the first 15 years from opening and matures 21 years after opening (or on the girl's marriage after age 18, if earlier). This calculator projects the maturity value based on a fixed yearly contribution and the current interest rate.",
    ],
    formula: {
      expression: "Balanceᵧ = (Balanceᵧ₋₁ + Depositᵧ) × (1 + rate)",
      notes:
        "Interest is compounded annually on the balance plus that year's deposit. Deposits continue only for the first 15 years; the balance keeps compounding without new deposits until it matures 21 years after account opening.",
    },
    faqs: [
      {
        q: "Who is eligible to open an SSY account?",
        a: "A parent or legal guardian can open an SSY account for a girl child from birth up to age 10, with a maximum of two accounts per family (or three in the case of twins/triplets on the second birth).",
      },
      {
        q: "What is the minimum and maximum deposit allowed?",
        a: "You can deposit a minimum of ₹250 and a maximum of ₹1,50,000 per financial year into an SSY account, in any number of instalments.",
      },
      {
        q: "Is SSY interest and maturity amount taxable?",
        a: "No. SSY is an EEE (Exempt-Exempt-Exempt) instrument — contributions qualify for Section 80C deduction, the interest earned is tax-free, and the maturity amount is also fully tax-exempt.",
      },
    ],
  },

  ppf: {
    about: [
      "The Public Provident Fund (PPF) is a long-term government savings scheme with a 15-year lock-in, backed by a sovereign guarantee and a quarterly-revised interest rate. It's one of the most widely used tax-saving instruments in India.",
      "This calculator projects your PPF balance year by year, compounding annually on your deposits plus accumulated interest, using the current interest rate.",
    ],
    formula: {
      expression: "Balanceᵧ = (Balanceᵧ₋₁ + Depositᵧ) × (1 + rate)",
      notes: "Each year's deposit is added to the running balance, and interest is credited annually on the full balance at the current PPF rate.",
    },
    faqs: [
      {
        q: "What is the current PPF interest rate?",
        a: "PPF interest is set by the government every quarter. This calculator uses the current published rate — check the latest rate on the India Post or your bank's PPF page if it's been revised since, and adjust the input accordingly.",
      },
      {
        q: "What are the minimum and maximum PPF contribution limits?",
        a: "You can deposit a minimum of ₹500 and a maximum of ₹1,50,000 in a PPF account per financial year, in up to 12 instalments.",
      },
      {
        q: "Can I withdraw from PPF before 15 years?",
        a: "Partial withdrawals are allowed from the 7th financial year onward, subject to limits, and loans against the balance are available between years 3–6. Full withdrawal (maturity) is only available after the 15-year lock-in, though the account can be extended in blocks of 5 years afterward.",
      },
    ],
  },

  epf: {
    about: [
      "The Employees' Provident Fund (EPF) is a mandatory retirement savings scheme for salaried employees in India, where both you and your employer contribute a percentage of your basic salary every month, and the balance earns interest set annually by EPFO.",
      "This calculator projects your EPF corpus from your current age to retirement, splitting employer contributions between EPF and the Employees' Pension Scheme (EPS) as per the actual rules, and compounding the balance monthly.",
    ],
    formula: {
      expression: "Employee EPF = 12% of basic · Employer EPS = min(8.33% × basic, 8.33% × ₹15,000) · Employer EPF = 12% of basic − EPS",
      notes:
        "You contribute a flat 12% of basic salary to EPF. Your employer's 12% is split: up to 8.33% (capped on a ₹15,000 wage ceiling) goes to EPS, and the remainder goes to your EPF account, which compounds monthly at the current EPF interest rate.",
    },
    faqs: [
      {
        q: "Why doesn't all of my employer's contribution go into my EPF balance?",
        a: "By law, up to 8.33% of your employer's contribution (capped at 8.33% of a ₹15,000 wage ceiling, i.e. max ₹1,250/month) is diverted to the Employees' Pension Scheme (EPS), which pays a pension after retirement rather than a lump sum.",
      },
      {
        q: "What is the current EPF interest rate?",
        a: "EPFO announces the EPF interest rate annually, and it's credited to your account once declared. This calculator uses the current declared rate — update the assumption if a new rate has since been announced.",
      },
      {
        q: "Can I withdraw my EPF balance before retirement?",
        a: "Full withdrawal is allowed after 2 months of unemployment or at retirement; partial withdrawals are permitted earlier for specific purposes like a home purchase, medical emergency, or wedding, subject to EPFO's eligibility rules.",
      },
    ],
  },

  fd: {
    about: [
      "A Fixed Deposit (FD) is a lump sum locked with a bank for a chosen tenure at a fixed interest rate, with the interest compounding at a frequency the bank decides — usually quarterly.",
      "This calculator computes your FD's maturity value using compound interest at your chosen compounding frequency, so you can compare how the same rate performs across monthly, quarterly, half-yearly, or yearly compounding.",
    ],
    formula: {
      expression: "A = P × (1 + r/n)ⁿᵗ",
      notes: "P is the principal, r is the annual interest rate, n is the number of compounding periods per year, and t is the tenure in years.",
    },
    faqs: [
      {
        q: "Does compounding frequency really change the maturity amount?",
        a: "Yes, though the difference is small — more frequent compounding (e.g. monthly vs yearly) earns marginally more interest, since interest itself starts earning interest sooner. Over long tenures and large principals, this can add up to a meaningful amount.",
      },
      {
        q: "Is FD interest taxable?",
        a: "Yes — FD interest is fully taxable as 'income from other sources' at your income tax slab rate, and banks deduct TDS if the interest exceeds the threshold for the financial year (see the TDS calculator for current thresholds).",
      },
      {
        q: "What's the difference between a cumulative and non-cumulative FD?",
        a: "A cumulative FD reinvests interest and pays out the full compounded amount at maturity (what this calculator computes), while a non-cumulative FD pays out interest periodically (monthly/quarterly) as income instead of compounding it.",
      },
    ],
  },

  rd: {
    about: [
      "A Recurring Deposit (RD) lets you deposit a fixed amount every month for a chosen tenure, earning compound interest on each instalment for however long it remains in the account.",
      "Because each monthly deposit is invested for a different length of time — the first instalment compounds for the full tenure, the last for barely a month — RD maturity value is calculated by summing the compounded value of every individual instalment.",
    ],
    formula: {
      expression: "Maturity = Σ [Monthly Deposit × (1 + r/4)^(remaining quarters)]",
      notes:
        "Each monthly deposit compounds quarterly (the standard RD convention) for however many quarters remain until maturity. r is the annual interest rate, and the calculator sums the compounded value of every instalment.",
    },
    faqs: [
      {
        q: "Why is RD maturity slightly different from a simple SIP-style projection?",
        a: "Because RD interest is conventionally compounded quarterly (not monthly), and each instalment's compounding period is based on calendar quarters remaining, not a smooth monthly formula — this can produce small differences from generic SIP-style future value formulas.",
      },
      {
        q: "Can I withdraw an RD before maturity?",
        a: "Most banks allow premature closure of an RD, usually with a penalty (typically 0.5–1% lower interest rate) applied to the amount already deposited.",
      },
      {
        q: "Is RD interest taxable?",
        a: "Yes, RD interest is fully taxable as income from other sources at your slab rate, and TDS applies once total interest crosses the annual threshold, similar to fixed deposits.",
      },
    ],
  },

  nps: {
    about: [
      "The National Pension System (NPS) is a government-regulated, market-linked retirement scheme where your contributions are invested (in a mix of equity, corporate debt, and government bonds you choose) until you turn 60, after which part of the corpus must be annuitised into a monthly pension.",
      "This calculator projects your NPS corpus at 60 from your current contributions, then estimates the monthly pension you'd receive by annuitising your chosen percentage of that corpus at an assumed annuity rate.",
    ],
    formula: {
      expression: "Corpus = SIP future value up to age 60 · Pension = (Corpus × Annuity %) × Annuity Rate ÷ 12",
      notes:
        "The accumulation phase uses the same compounding logic as a SIP. At retirement, the corpus splits into a lump sum and an annuity portion; the annuity portion is converted into a monthly pension at your assumed annuity rate.",
    },
    faqs: [
      {
        q: "How much of my NPS corpus can I withdraw as a lump sum at 60?",
        a: "By rule, at least 40% of your NPS corpus must be used to buy an annuity (for the monthly pension); you can withdraw up to 60% as a tax-free lump sum. This calculator lets you adjust the annuity percentage to see how it affects your pension.",
      },
      {
        q: "Is the annuity rate the same as my pre-retirement NPS return?",
        a: "No — the annuity rate is a separate, typically lower rate offered by the insurance company that pays out your pension, and is usually well below the market-linked returns you'd earn during the accumulation phase.",
      },
      {
        q: "Does NPS offer any tax benefits?",
        a: "Yes — NPS contributions qualify for deduction under Section 80CCD(1) within the overall 80C limit, plus an additional ₹50,000 deduction under Section 80CCD(1B), making it one of the few instruments with tax benefits beyond the standard 80C cap.",
      },
    ],
  },

  apy: {
    about: [
      "Atal Pension Yojana (APY) is a government pension scheme aimed at unorganised-sector workers, guaranteeing a fixed monthly pension (₹1,000 to ₹5,000) from age 60, in exchange for a monthly contribution that depends on your age at entry and the pension amount you choose.",
      "This calculator looks up your required monthly contribution from the official PFRDA contribution chart, based on your current age and desired pension amount.",
    ],
    formula: {
      expression: "Monthly contribution = PFRDA table lookup [age, desired pension]",
      notes:
        "Unlike other calculators here, APY contributions aren't computed from a formula — PFRDA publishes a fixed table of monthly contribution amounts for every combination of entry age (18–40) and target pension (₹1,000–₹5,000), and this calculator looks up the value directly.",
    },
    faqs: [
      {
        q: "Why does my contribution depend on my age?",
        a: "The younger you join, the longer your contributions have to accumulate before payouts begin at 60, so the required monthly contribution is much lower for an 18-year-old than for someone joining at 39, for the same target pension.",
      },
      {
        q: "What happens to my contributions if I die before 60?",
        a: "Your spouse can continue the contributions and receive the same guaranteed pension, or claim the accumulated corpus. If both the subscriber and spouse pass away, the corpus is paid out to the nominee.",
      },
      {
        q: "Is the pension amount guaranteed regardless of investment performance?",
        a: "Yes — APY offers a government-guaranteed minimum pension of the amount you choose, unlike NPS, where the payout depends on market performance during accumulation.",
      },
    ],
  },

  nsc: {
    about: [
      "The National Savings Certificate (NSC) is a fixed-income, government-backed savings instrument available at post offices, with a 5-year lock-in and interest compounded annually but paid out only at maturity.",
      "This calculator computes your NSC maturity value using annual compound interest over the fixed 5-year tenure at the current NSC interest rate.",
    ],
    formula: {
      expression: "A = P × (1 + r)⁵",
      notes: "P is the amount invested, r is the current annual NSC interest rate, and interest compounds annually over the fixed 5-year tenure.",
    },
    faqs: [
      {
        q: "Is NSC interest paid out yearly or only at maturity?",
        a: "The interest is compounded and reinvested annually, but you don't actually receive any payout until the certificate matures after 5 years, when the full principal plus compounded interest is paid in one go.",
      },
      {
        q: "Does NSC qualify for a tax deduction?",
        a: "Yes — the amount invested in NSC qualifies for deduction under Section 80C, up to the overall ₹1.5 lakh limit for that section.",
      },
      {
        q: "Is the interest earned on NSC taxable?",
        a: "Yes, the annual accrued interest is taxable as income each year (even though you don't receive it in cash), except the final year's interest, which is exempt since it's assumed reinvested and already claimed under 80C in the year of investment — though it's still added to your taxable income in the year it's earned. It's best to check current rules with a tax advisor for your specific case.",
      },
    ],
  },

  "post-office-mis": {
    about: [
      "The Post Office Monthly Income Scheme (POMIS) is a government-backed savings scheme that pays a fixed monthly income on a lump sum deposit, over a 5-year tenure, without touching the principal until maturity.",
      "This calculator computes your monthly payout and total interest earned over the tenure, based on your deposit amount and the current POMIS interest rate.",
    ],
    formula: {
      expression: "Monthly Income = Deposit × (Annual Rate ÷ 100) ÷ 12",
      notes: "The annual interest is calculated on the full deposit and paid out in equal monthly instalments; the principal itself is returned only at maturity.",
    },
    faqs: [
      {
        q: "What are the deposit limits for POMIS?",
        a: "As per current rules, an individual can deposit up to ₹9 lakh in a single POMIS account, or up to ₹15 lakh in a joint account, with a minimum deposit of ₹1,000.",
      },
      {
        q: "Is the monthly income from POMIS taxable?",
        a: "Yes — the monthly payout is fully taxable as income from other sources at your applicable slab rate; POMIS doesn't offer any Section 80C deduction on the deposit itself.",
      },
      {
        q: "What happens if I withdraw before the 5-year maturity?",
        a: "Premature withdrawal is allowed after 1 year, but with a penalty deducted from the principal — typically 2% if withdrawn before 3 years, and 1% between 3 and 5 years.",
      },
    ],
  },

  scss: {
    about: [
      "The Senior Citizens Savings Scheme (SCSS) is a government scheme for individuals aged 60+ (or 55+ for certain retirees), offering one of the highest interest rates among small savings schemes, paid out quarterly over a 5-year tenure.",
      "This calculator computes your quarterly payout and total interest earned over the 5-year tenure at the current SCSS interest rate.",
    ],
    formula: {
      expression: "Quarterly Payout = Deposit × (Annual Rate ÷ 100) ÷ 4",
      notes: "Interest is calculated annually on the full deposit and paid out in four equal quarterly instalments; the principal is returned at maturity.",
    },
    faqs: [
      {
        q: "Who is eligible to open an SCSS account?",
        a: "Individuals aged 60 and above, or 55+ for those who've retired under superannuation or VRS (subject to conditions), can open an SCSS account, with a maximum deposit limit of ₹30 lakh.",
      },
      {
        q: "Does SCSS offer a tax deduction?",
        a: "Yes — SCSS deposits qualify for Section 80C deduction up to the ₹1.5 lakh overall limit, but the quarterly interest received is fully taxable as income, and TDS applies once annual interest crosses the threshold.",
      },
      {
        q: "Can the account be extended after 5 years?",
        a: "Yes — SCSS can be extended once for an additional 3 years after the initial 5-year maturity, and the interest rate applicable at the time of extension applies to the extended period.",
      },
    ],
  },

  retirement: {
    about: [
      "Retirement planning means working backward from how much you'll need to spend every month after you stop working, adjusted for inflation between now and retirement, to figure out how large a corpus you need to build — and how much you should be investing today to get there.",
      "This calculator inflates your current monthly expenses to their future value at retirement, estimates the total corpus needed to sustain that spending through your expected retirement years (accounting for continued inflation and post-retirement investment returns), and works out the monthly SIP needed to build that corpus by your retirement age.",
    ],
    formula: {
      expression: "Required Corpus = Future Annual Expense × [(1 − (1+realRate)⁻ⁿ) / realRate] × (1+realRate)",
      notes:
        "Future annual expense is your current monthly expense inflated to your retirement year. The real rate is your post-retirement investment return adjusted for continuing inflation, and n is the number of years you expect to be retired.",
    },
    faqs: [
      {
        q: "Why does inflation get applied twice — before and after retirement?",
        a: "Your expenses need to be inflated to what they'll actually cost in the year you retire (pre-retirement inflation), and then the corpus itself needs to keep growing faster than inflation throughout your retirement years to sustain rising costs — which is what the 'real rate' calculation accounts for.",
      },
      {
        q: "What's a realistic post-retirement return to assume?",
        a: "Post-retirement, most people shift toward safer, lower-volatility instruments (debt funds, senior citizen schemes, FDs), so a conservative assumption of 6–8% is more realistic than the higher equity-linked returns used during the accumulation phase.",
      },
      {
        q: "Does this account for one-off retirement costs like healthcare?",
        a: "No — this calculator only projects a steady monthly expense inflated over time. Large one-off costs (medical emergencies, a child's wedding, etc.) should be budgeted for separately, on top of the corpus shown here.",
      },
    ],
  },

  // ---------- Tax ----------

  "income-tax": {
    about: [
      "India currently offers two tax regimes — the new regime (default, with lower rates but fewer deductions) and the old regime (higher rates but allows deductions like 80C, HRA, and home loan interest). This calculator compares your tax liability under both for FY 2025-26.",
      "It applies the applicable slab rates, standard deduction, and rebate under Section 87A for your chosen regime, then adds 4% health and education cess to arrive at your total tax and in-hand income.",
    ],
    formula: {
      expression: "Tax = Σ(slab income × slab rate) − rebate (u/s 87A, if eligible), then + 4% cess",
      notes:
        "Taxable income is your gross income minus the standard deduction (₹75,000 under the new regime, ₹50,000 under the old). Slab-wise tax is computed progressively, a rebate may apply if taxable income is below the regime's threshold, and 4% cess is added on the tax after rebate.",
    },
    faqs: [
      {
        q: "Which regime should I choose — new or old?",
        a: "The new regime generally works out better if you don't claim many deductions (no HRA, 80C investments, or home loan). The old regime can be better if your eligible deductions are large enough to bring your taxable income into a lower effective bracket — compare both using this calculator with your actual numbers.",
      },
      {
        q: "What is the rebate under Section 87A?",
        a: "It's a tax rebate that effectively makes your tax liability zero if your taxable income is below a threshold — currently up to ₹12 lakh under the new regime and ₹5 lakh under the old regime — subject to the rebate not exceeding your actual pre-rebate tax.",
      },
      {
        q: "Does this calculator account for deductions like 80C or HRA?",
        a: "Not directly — enter your income after subtracting any deductions you're claiming under the old regime (like 80C, 80D, or HRA exemption) to get an accurate old-regime comparison. The new regime doesn't allow most of these deductions.",
      },
    ],
  },

  hra: {
    about: [
      "House Rent Allowance (HRA) is a salary component that's partially tax-exempt if you live in rented accommodation. The exemption is the least of three amounts, which means simply receiving a large HRA doesn't guarantee it's fully tax-free.",
      "This calculator computes your exact HRA exemption using the standard formula, factoring in whether you live in a metro city (which allows a higher exemption ceiling) or a non-metro city.",
    ],
    formula: {
      expression: "Exemption = min(HRA received, Rent paid − 10% of Basic+DA, 50%/40% of Basic+DA)",
      notes:
        "The 50% figure applies for metro cities (Delhi, Mumbai, Kolkata, Chennai) and 40% for all other cities. Only the lowest of the three amounts is exempt; the rest of your HRA is taxable as salary.",
    },
    faqs: [
      {
        q: "Do I need to pay rent to claim HRA exemption?",
        a: "Yes — you must actually be paying rent for accommodation you live in, and for claims above ₹1 lakh a year, you're required to provide your landlord's PAN to your employer.",
      },
      {
        q: "Can I claim HRA exemption if I live in my own house?",
        a: "No — HRA exemption requires you to be paying rent. If you own your home and don't pay rent, your entire HRA is taxable, though you may still claim home loan interest deduction separately if applicable.",
      },
      {
        q: "Is HRA exemption available under the new tax regime?",
        a: "No — HRA exemption is only available if you opt for the old tax regime. The new regime doesn't allow this exemption, though it uses lower slab rates overall.",
      },
    ],
  },

  tds: {
    about: [
      "Tax Deducted at Source (TDS) requires the payer (a bank, employer, or client) to deduct tax before paying you, and deposit it with the government on your behalf — you then claim credit for it when filing your return.",
      "This calculator estimates the TDS deductible on common payment types — FD/RD interest, rent, professional fees, commission, contractor payments, and dividends — based on the applicable section, rate, and threshold.",
    ],
    formula: {
      expression: "TDS = Payment Amount × Section Rate (only if amount exceeds the section's threshold)",
      notes:
        "Each section under the Income Tax Act has its own rate and minimum threshold below which no TDS applies. If PAN isn't provided, a higher flat rate (typically 20%) applies instead of the section's normal rate.",
    },
    faqs: [
      {
        q: "What happens if I don't provide my PAN?",
        a: "Under Section 206AA, TDS is deducted at a higher rate (usually 20%, or the section's rate if higher) when PAN isn't furnished, instead of the normal, lower rate for that payment type.",
      },
      {
        q: "Is TDS the final tax I owe on that income?",
        a: "No — TDS is only a prepayment. You still need to report the full income in your tax return and pay any additional tax due (or claim a refund) if your actual tax liability differs from the amount deducted.",
      },
      {
        q: "Does TDS apply if the payment is below the threshold?",
        a: "No — each section specifies a threshold below which no TDS is deducted at all. Once the cumulative payment in a financial year crosses that threshold, TDS applies to the payment.",
      },
    ],
  },

  gratuity: {
    about: [
      "Gratuity is a lump-sum payment from your employer as a thank-you for continuous service, typically paid when you leave after 5+ years of service (resignation, retirement, or termination not due to misconduct).",
      "This calculator computes your gratuity payout under the Payment of Gratuity Act, 1972, using your last drawn salary and years of service, capped at the statutory maximum.",
    ],
    formula: {
      expression: "Gratuity = (Last Drawn Salary × 15 × Years of Service) ÷ 26",
      notes:
        "For employees covered under the Act, 26 is used as the standard working days in a month and years of service is rounded to the nearest whole year. The payout is capped at ₹20 lakh regardless of the formula's result.",
    },
    faqs: [
      {
        q: "Am I eligible for gratuity if I've worked less than 5 years?",
        a: "Generally no — the Payment of Gratuity Act requires a minimum of 5 years of continuous service, except in cases of death or disablement, where the 5-year requirement is waived.",
      },
      {
        q: "Is gratuity taxable?",
        a: "For employees covered under the Act, gratuity is tax-exempt up to ₹20 lakh (the statutory cap) over your lifetime across all employers; any amount received beyond that is taxable as salary income.",
      },
      {
        q: "What's the difference between 'covered' and 'not covered' under the Act?",
        a: "Most establishments with 10+ employees are covered under the Act and use the 26-day-month formula. Employees at smaller establishments not covered under the Act may still receive gratuity under their employer's policy, typically calculated using a 30-day month instead — this calculator lets you toggle between the two.",
      },
    ],
  },

  salary: {
    about: [
      "Your CTC (Cost to Company) isn't what lands in your bank account — it includes components like employer PF contribution and gratuity provision that never touch your salary account, and your take-home is further reduced by your own PF contribution, professional tax, and income tax.",
      "This calculator breaks your CTC down into its components — basic, HRA, employer/employee PF, gratuity provision, and special allowance — then computes your tax liability and final monthly take-home pay under your chosen regime.",
    ],
    formula: {
      expression: "Take-home = CTC − Employer PF − Gratuity − Employee PF − Professional Tax − Income Tax",
      notes:
        "Employer PF and gratuity provision are part of CTC but never reach your salary account. Employee PF, professional tax, and income tax are then deducted from your gross salary to arrive at what you actually take home.",
    },
    faqs: [
      {
        q: "Why is my take-home so much lower than my CTC?",
        a: "CTC includes amounts your employer sets aside on your behalf — its own PF contribution and a gratuity provision — that you never receive as cash. On top of that, your own PF contribution, professional tax, and income tax are deducted from what's left.",
      },
      {
        q: "Does the basic salary percentage I choose actually matter?",
        a: "Yes — a higher basic salary percentage increases your HRA (usually 50% of basic) and PF contributions (12% of basic each side), which can increase tax-free HRA exemption but also increases the mandatory PF deduction from your take-home.",
      },
      {
        q: "Is professional tax the same across India?",
        a: "No — professional tax is a state-level tax, and both the rate and whether it applies at all varies by state (some states don't levy it). Adjust the monthly amount to match your specific state's slab.",
      },
    ],
  },

  // ---------- Loans & EMI ----------

  emi: {
    about: [
      "An EMI (Equated Monthly Instalment) is the fixed monthly payment you make toward a loan, covering both interest and a portion of the principal, such that the loan is fully repaid by the end of its tenure.",
      "This calculator computes your EMI and shows a full amortisation schedule — how much of each payment goes toward interest versus principal, and how that split shifts toward principal as the loan matures.",
    ],
    formula: {
      expression: "EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
      notes: "P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments (loan tenure in months).",
    },
    faqs: [
      {
        q: "Why does most of my early EMI go toward interest?",
        a: "Interest is charged on the outstanding principal, which is highest at the start of the loan. As you repay principal each month, the outstanding balance — and therefore the interest portion of each EMI — shrinks, so later instalments repay more principal.",
      },
      {
        q: "Does prepaying a loan actually save much interest?",
        a: "Yes, significantly — since interest is calculated on the outstanding balance, any prepayment reduces the principal that future interest is calculated on, which can meaningfully shorten the loan or reduce total interest paid, especially if done early in the tenure.",
      },
      {
        q: "What happens if I change the tenure but keep the EMI the same?",
        a: "A shorter tenure means a higher EMI but significantly less total interest paid over the life of the loan, while a longer tenure lowers the EMI but increases total interest paid — use this calculator to compare tenures directly.",
      },
    ],
  },

  "car-loan-emi": {
    about: [
      "Car loans in India typically come with shorter tenures (1–7 years) and higher interest rates than home loans, since vehicles depreciate quickly and lenders treat them as higher-risk collateral.",
      "This calculator computes your monthly car loan EMI and total interest cost using the same reducing-balance method banks use, so you can compare offers or tenures before signing.",
    ],
    formula: {
      expression: "EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
      notes: "P is the on-road price minus your down payment (the amount actually financed), r is the monthly interest rate, and n is the tenure in months.",
    },
    faqs: [
      {
        q: "Should I make a larger down payment on a car loan?",
        a: "A larger down payment reduces the amount financed, which lowers both your EMI and total interest paid — and can also help you qualify for a better interest rate, since it reduces the lender's risk.",
      },
      {
        q: "Why are car loan interest rates higher than home loan rates?",
        a: "Cars depreciate quickly and aren't as easily resold at full value if the lender needs to recover the loan, so lenders price in that higher risk with rates typically 1–3% higher than home loans.",
      },
      {
        q: "Is it better to take a longer tenure for a lower EMI?",
        a: "A longer tenure lowers your monthly EMI but increases total interest paid over the loan — and since cars depreciate fast, you risk owing more than the car is worth for longer. Shorter tenures are generally better if you can afford the higher EMI.",
      },
    ],
  },

  "home-loan-emi": {
    about: [
      "Home loans are typically the largest and longest loans most people take, often running 15–30 years, which makes even small differences in interest rate or tenure add up to a large difference in total interest paid.",
      "This calculator computes your home loan EMI and full amortisation schedule, so you can see exactly how much interest you'll pay over the life of the loan and how that changes with tenure or rate.",
    ],
    formula: {
      expression: "EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
      notes: "P is the loan amount, r is the monthly interest rate, and n is the tenure in months. Most home loans in India use a floating rate, so your actual EMI may change if the rate is revised.",
    },
    faqs: [
      {
        q: "Fixed or floating rate — how does that affect this calculation?",
        a: "This calculator assumes a fixed rate for the full tenure. Most Indian home loans are floating-rate, meaning your EMI or tenure can change when the lender's benchmark rate moves — treat the result here as based on today's rate, not a lifetime guarantee.",
      },
      {
        q: "Is home loan interest tax-deductible?",
        a: "Under the old tax regime, home loan interest is deductible up to ₹2 lakh per year under Section 24(b) for a self-occupied property, and principal repayment qualifies under Section 80C. These deductions aren't available under the new regime.",
      },
      {
        q: "How much does a longer tenure actually cost in extra interest?",
        a: "Substantially more — extending a large, long-tenure loan by even 5 years can add lakhs in total interest, since you're paying interest on a high outstanding balance for longer. Use this calculator to compare tenures side by side before deciding.",
      },
    ],
  },

  "simple-interest": {
    about: [
      "Simple interest is calculated only on the original principal for the entire loan or investment period — unlike compound interest, it never earns interest on previously accumulated interest.",
      "This calculator computes the total simple interest and final amount for a given principal, rate, and duration, useful for short-term loans or instruments that explicitly use simple interest.",
    ],
    formula: {
      expression: "SI = (P × R × T) ÷ 100",
      notes: "P is the principal, R is the annual interest rate, and T is the time period in years. Total amount is the principal plus the simple interest.",
    },
    faqs: [
      {
        q: "When is simple interest actually used in practice?",
        a: "Simple interest is common for short-term loans, some personal loans, and certain bonds. Most long-term savings and investment products (FDs, RDs, mutual funds) use compound interest instead, which grows faster.",
      },
      {
        q: "Why does simple interest grow slower than compound interest?",
        a: "Because simple interest is always calculated on the original principal only — it never lets earlier interest start earning interest of its own, so the total grows linearly instead of exponentially.",
      },
      {
        q: "Is simple interest ever better for the borrower?",
        a: "Yes — for a borrower, simple interest is cheaper than compound interest at the same rate, since you're never charged interest on interest already accrued. It's the opposite for an investor, where compounding works in your favour.",
      },
    ],
  },

  "compound-interest": {
    about: [
      "Compound interest is calculated on both the original principal and any interest already accumulated, which means your money grows faster over time compared to simple interest — the effect becomes more pronounced the longer the money stays invested.",
      "This calculator lets you compute compound interest at different compounding frequencies — annually, half-yearly, quarterly, or monthly — since more frequent compounding, even at the same nominal rate, produces a slightly higher final amount.",
    ],
    formula: {
      expression: "A = P × (1 + r/n)ⁿᵗ",
      notes: "P is the principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the time in years.",
    },
    faqs: [
      {
        q: "Why does compounding frequency matter if the annual rate is the same?",
        a: "More frequent compounding means interest gets added to the principal sooner and starts earning its own interest sooner, so monthly compounding will always produce a slightly higher final amount than yearly compounding at the same nominal rate.",
      },
      {
        q: "What's the difference between nominal and effective interest rate?",
        a: "The nominal rate is the stated annual rate (e.g. 8%), while the effective rate accounts for compounding frequency and is always slightly higher when compounding happens more than once a year — this calculator uses the nominal rate you enter directly in the formula.",
      },
      {
        q: "Over what timeframes does compounding make the biggest difference?",
        a: "The gap between compound and simple interest grows disproportionately larger the longer the money stays invested — the difference is small over 1–2 years but becomes very significant over 10–20+ years, which is the core reason to start investing early.",
      },
    ],
  },

  "flat-vs-reducing": {
    about: [
      "Loans can be quoted with a 'flat rate' (interest calculated on the full original principal for the entire tenure) or a 'reducing balance rate' (interest calculated only on the outstanding balance, which shrinks every month). The same quoted rate produces a very different — and much higher — effective cost under a flat rate.",
      "This calculator compares both methods side by side for the same loan amount, rate, and tenure, and shows the effective reducing-balance rate that a flat rate actually amounts to.",
    ],
    formula: {
      expression: "Flat EMI = (P + P×R×T) ÷ n · Reducing EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
      notes:
        "Under a flat rate, interest is charged on the full principal P for the entire tenure regardless of repayments already made. Under reducing balance, interest is charged only on the remaining outstanding principal each month, which is why reducing balance is cheaper for the same nominal rate.",
    },
    faqs: [
      {
        q: "Why is a flat rate loan more expensive than the same reducing-balance rate?",
        a: "Because a flat rate keeps charging interest on the original principal even after you've repaid a large chunk of it, while reducing balance only charges interest on what you actually still owe — so a flat rate always costs meaningfully more for the same quoted percentage.",
      },
      {
        q: "Which type of loan typically uses a flat rate?",
        a: "Flat rates are common with some personal loans, gold loans, and used-vehicle financing, often marketed with a lower-looking headline rate. Home and most car loans typically use reducing balance — always ask which method applies before comparing rates.",
      },
      {
        q: "How do I compare a flat rate loan to a reducing balance offer?",
        a: "Convert the flat rate to its effective reducing-balance equivalent (shown by this calculator) before comparing — a flat rate of 8% can work out to an effective reducing-balance rate of around 14–15%, depending on tenure.",
      },
    ],
  },

  inflation: {
    about: [
      "Inflation steadily erodes the purchasing power of money — the same ₹100 buys less next year than it does today. This calculator works in two directions: projecting what today's cost will become in the future, or working out what today's money was worth in the past.",
      "It's a useful reality check when planning long-term goals like retirement or a child's education, since the sticker price you see today isn't what you'll actually pay when the expense arrives years from now.",
    ],
    formula: {
      expression: "Future Cost = Amount × (1 + rate)ⁿ · Eroded Value = Amount ÷ (1 + rate)ⁿ",
      notes: "Future cost projects today's amount forward by n years at the inflation rate; eroded value shows what that same amount would be worth in today's terms after n years of inflation.",
    },
    faqs: [
      {
        q: "What inflation rate should I assume for long-term planning?",
        a: "India's long-term average consumer inflation has historically been in the 5–7% range, though specific categories (education, healthcare) often run higher. A commonly used planning assumption is 6%.",
      },
      {
        q: "Why does this matter for retirement or goal planning?",
        a: "If you only plan around today's expenses without adjusting for inflation, you'll significantly underestimate how much you'll actually need by the time you reach your goal — which is why the retirement and other goal-based calculators here factor inflation into the required corpus.",
      },
      {
        q: "Is investment return the same as beating inflation?",
        a: "Not necessarily — your real (inflation-adjusted) return is your investment return minus the inflation rate. An investment earning 7% when inflation is 6% is only really growing your purchasing power by about 1% a year.",
      },
    ],
  },
};
