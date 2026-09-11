// Indian numbering (lakh/crore) formatting helpers

export function formatIndianNumber(num) {
  if (num === null || num === undefined || Number.isNaN(num)) return "0";
  const n = Math.round(num);
  const isNeg = n < 0;
  const s = Math.abs(n).toString();
  if (s.length <= 3) return (isNeg ? "-" : "") + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return (isNeg ? "-" : "") + grouped + "," + last3;
}

export function formatIndianDecimal(num, decimals = 0) {
  if (num === null || num === undefined || Number.isNaN(num)) return "0";
  const isNeg = num < 0;
  const fixed = Math.abs(num).toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const grouped = formatIndianNumber(Number(intPart));
  return (isNeg ? "-" : "") + grouped + (decPart ? "." + decPart : "");
}

export function formatCurrency(num, opts = {}) {
  const { decimals = 0 } = opts;
  if (num === null || num === undefined || Number.isNaN(num)) return "₹0";
  const fixed = decimals ? Number(num).toFixed(decimals) : Math.round(num).toString();
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = formatIndianNumber(Number(intPart));
  return "₹" + formattedInt + (decPart ? "." + decPart : "");
}

// Compact form used in stat cards: ₹6.00 L, ₹8.7K, ₹1.62 Cr
export function formatCompact(num) {
  if (num === null || num === undefined || Number.isNaN(num)) return "₹0";
  const isNeg = num < 0;
  const abs = Math.abs(num);
  let out;
  if (abs >= 1_00_00_000) {
    out = "₹" + (abs / 1_00_00_000).toFixed(2) + " Cr";
  } else if (abs >= 1_00_000) {
    out = "₹" + (abs / 1_00_000).toFixed(2) + " L";
  } else if (abs >= 1_000) {
    out = "₹" + (abs / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    out = "₹" + Math.round(abs);
  }
  return (isNeg ? "-" : "") + out;
}

export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined || Number.isNaN(num)) return "0";
  return Number(num).toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export function formatPercent(num, decimals = 1) {
  if (num === null || num === undefined || Number.isNaN(num)) return "0%";
  return Number(num).toFixed(decimals) + "%";
}
