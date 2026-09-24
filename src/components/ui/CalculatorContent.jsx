export default function CalculatorContent({ about, formula, faqs }) {
  if (!about && !formula && !(faqs && faqs.length)) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <div className="hidden lg:block" />
        <div className="space-y-10 max-w-2xl">
          {about && (
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                About this calculator
              </h2>
              <div className="space-y-3">
                {about.map((p, i) => (
                  <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {formula && (
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">Formula used</h2>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
                <code className="block text-sm text-[var(--accent)] font-mono mb-3 break-words">
                  {formula.expression}
                </code>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{formula.notes}</p>
              </div>
            </div>
          )}

          {faqs && faqs.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                Frequently asked questions
              </h2>
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 open:border-[var(--border-strong)]"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-medium text-[var(--text-primary)]">
                      {f.q}
                      <span className="shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
