import { formatIndianNumber, formatIndianDecimal } from "../../lib/format";

function decimalsForStep(step) {
  const s = String(step);
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
  formatValue,
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const decimals = Number.isInteger(value) ? 0 : decimalsForStep(step);
  const display = formatValue
    ? formatValue(value)
    : `${prefix}${formatIndianDecimal(value, decimals)}${suffix}`;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-[var(--text-secondary)]">{label}</label>
        <div className="flex items-center bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-1">
          <span className="text-sm font-semibold text-[var(--accent)]">{display}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${pct}%` }}
      />
      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
        <span>
          {prefix}
          {formatIndianNumber(min)}
          {suffix}
        </span>
        <span>
          {prefix}
          {formatIndianNumber(max)}
          {suffix}
        </span>
      </div>
    </div>
  );
}
