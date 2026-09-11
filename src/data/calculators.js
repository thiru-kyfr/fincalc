export const CATEGORIES = ["All", "Investment", "Savings", "Tax", "Loans & EMI", "Trading"];

export const CALCULATORS = [
  // Investment
  { slug: "sip", title: "SIP Calculator", category: "Investment", description: "Project how much a monthly SIP will grow to, or work backward from a target corpus." },
  { slug: "lumpsum", title: "Lumpsum Calculator", category: "Investment", description: "See how a one-time investment compounds over time toward your goal." },
  { slug: "swp", title: "SWP Calculator", category: "Investment", description: "Model a Systematic Withdrawal Plan and see how long your corpus lasts." },
  { slug: "mf-returns", title: "MF Returns Calculator", category: "Investment", description: "Turn an invested amount and current value into absolute and annualised returns." },
  { slug: "step-up-sip", title: "Step Up SIP Calculator", category: "Investment", description: "Calculate SIP growth when you increase your contribution every year." },
  { slug: "cagr", title: "CAGR Calculator", category: "Investment", description: "The simplest way to work out compound annual growth rate between two values." },
  { slug: "xirr", title: "XIRR Calculator", category: "Investment", description: "Find the annualised return on an investment with irregular dated cash flows." },
  { slug: "roi", title: "ROI Calculator", category: "Investment", description: "Work out the plain and annualised return on any investment." },

  // Savings
  { slug: "ssy", title: "SSY Calculator", category: "Savings", description: "Project maturity value for a Sukanya Samriddhi Yojana account." },
  { slug: "ppf", title: "PPF Calculator", category: "Savings", description: "Calculate your Public Provident Fund maturity value, year on year." },
  { slug: "epf", title: "EPF Calculator", category: "Savings", description: "Estimate your Employees' Provident Fund corpus at retirement." },
  { slug: "fd", title: "FD Calculator", category: "Savings", description: "Check maturity value on a fixed deposit for any compounding frequency." },
  { slug: "rd", title: "RD Calculator", category: "Savings", description: "Calculate maturity value on a Recurring Deposit in a few clicks." },
  { slug: "nps", title: "NPS Calculator", category: "Savings", description: "Project your National Pension System corpus and expected monthly pension." },
  { slug: "apy", title: "APY Calculator", category: "Savings", description: "Find your required monthly contribution under Atal Pension Yojana." },
  { slug: "nsc", title: "NSC Calculator", category: "Savings", description: "Calculate maturity value under the National Savings Certificate scheme." },
  { slug: "post-office-mis", title: "Post Office MIS", category: "Savings", description: "Work out monthly income from a Post Office Monthly Income Scheme deposit." },
  { slug: "scss", title: "SCSS Calculator", category: "Savings", description: "Calculate quarterly payouts under the Senior Citizens Savings Scheme." },
  { slug: "retirement", title: "Retirement Calculator", category: "Savings", description: "Estimate the corpus you'll need for a comfortable retirement." },

  // Tax
  { slug: "income-tax", title: "Income Tax Calculator", category: "Tax", description: "Compare new vs old regime tax liability for FY 2025-26 in seconds." },
  { slug: "hra", title: "HRA Calculator", category: "Tax", description: "Work out how much of your House Rent Allowance is tax exempt." },
  { slug: "tds", title: "TDS Calculator", category: "Tax", description: "Estimate TDS deduction across common payment types and sections." },
  { slug: "gst", title: "GST Calculator", category: "Tax", description: "Add or remove GST from an amount at any of the standard slab rates." },
  { slug: "gratuity", title: "Gratuity Calculator", category: "Tax", description: "Calculate the gratuity payout you're entitled to on leaving a job." },
  { slug: "salary", title: "Salary Calculator", category: "Tax", description: "Break down your CTC into take-home pay, deductions and tax." },

  // Loans & EMI
  { slug: "emi", title: "EMI Calculator", category: "Loans & EMI", description: "Calculate EMI for any loan — home, car, or personal — with a full schedule." },
  { slug: "car-loan-emi", title: "Car Loan EMI Calculator", category: "Loans & EMI", description: "Work out your monthly car loan instalment and total interest cost." },
  { slug: "home-loan-emi", title: "Home Loan EMI Calculator", category: "Loans & EMI", description: "Calculate EMI and amortisation for a home loan of any size or tenure." },
  { slug: "simple-interest", title: "Simple Interest Calculator", category: "Loans & EMI", description: "Calculate simple interest on loans and savings in one step." },
  { slug: "compound-interest", title: "Compound Interest Calculator", category: "Loans & EMI", description: "Calculate compound interest for any compounding frequency." },
  { slug: "flat-vs-reducing", title: "Flat vs Reducing Rate", category: "Loans & EMI", description: "See the real cost difference between flat-rate and reducing-balance EMIs." },
  { slug: "inflation", title: "Inflation Calculator", category: "Loans & EMI", description: "See how inflation erodes purchasing power, or inflates future cost." },

  // Trading
  { slug: "brokerage", title: "Brokerage Calculator", category: "Trading", description: "Break down brokerage, STT, and other charges on a stock trade." },
  { slug: "margin", title: "Margin Calculator", category: "Trading", description: "Estimate margin required for delivery, intraday, and F&O trades." },
  { slug: "stock-average", title: "Stock Average Calculator", category: "Trading", description: "Calculate your average buy price across multiple purchases." },
];
