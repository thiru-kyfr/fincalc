import { Link } from "react-router-dom";
import Icon from "../Icon";
import { CATEGORY_META, CALCULATORS } from "../../data/calculators";

export default function CalculatorShell({ title, description, category, inputs, children }) {
  const meta = CATEGORY_META[category];
  const calc = CALCULATORS.find((c) => c.title === title);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-up">
      <div className="text-xs text-[var(--text-muted)] mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:text-[var(--accent)] transition-colors">
          Calculators
        </Link>
        <span>/</span>
        <span style={{ color: meta?.color }}>{category}</span>
      </div>

      <div className="flex items-center gap-3.5 mb-2">
        {calc && (
          <span
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `color-mix(in srgb, ${meta.color} 16%, transparent)`, color: meta.color }}
          >
            <Icon name={calc.icon} size={22} />
          </span>
        )}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
      </div>
      <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-2xl">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <div className="text-sm font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Icon name="sliders" size={15} style={{ color: meta?.color }} />
            Enter Details
          </div>
          {inputs}
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}
