import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_META, CALCULATORS, POPULAR_SLUGS } from "../data/calculators";
import Icon from "../components/Icon";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return CALCULATORS.filter((c) => {
      const matchesCategory = category === "All" || c.category === category;
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const popular = CALCULATORS.filter((c) => POPULAR_SLUGS.includes(c.slug));
  const showPopular = category === "All" && !query;

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] font-semibold bg-[var(--accent-soft)] border border-[var(--accent)]/25 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          Free Tools · No Account Needed
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-br from-white via-white to-[var(--text-secondary)] bg-clip-text text-transparent">
            Money math,
          </span>
          <br />
          <span className="bg-[var(--accent-gradient)] bg-clip-text text-transparent">sorted in seconds.</span>
        </h1>

        <div className="relative max-w-lg mx-auto mb-8 mt-9">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <Icon name="target" size={18} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators — SIP, EMI, Tax…"
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)] transition-shadow"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const meta = CATEGORY_META[c];
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? "bg-[var(--text-primary)] text-[#0a0a0d] border-transparent"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                }`}
              >
                {meta && <Icon name={meta.icon} size={15} />}
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular strip */}
      {showPopular && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
          <div className="text-sm font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
            <Icon name="trending-up" size={16} className="text-[var(--accent)]" />
            Most Used
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popular.map((c) => {
              const meta = CATEGORY_META[c.category];
              return (
                <Link
                  key={c.slug}
                  to={`/calculators/${c.slug}`}
                  className="group flex flex-col items-center text-center gap-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${meta.color} 16%, transparent)`, color: meta.color }}
                  >
                    <Icon name={c.icon} size={18} />
                  </span>
                  <span className="text-xs font-medium text-[var(--text-primary)] leading-tight">{c.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-[var(--text-secondary)]">
            {category === "All" ? "All Calculators" : category}
          </div>
          <div className="text-sm text-[var(--text-muted)]">{filtered.length} tools</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const meta = CATEGORY_META[c.category];
            return (
              <Link
                key={c.slug}
                to={`/calculators/${c.slug}`}
                className="group relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: meta.color }}
                />
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${meta.color} 16%, transparent)`, color: meta.color }}
                  >
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `color-mix(in srgb, ${meta.color} 14%, transparent)`, color: meta.color }}
                  >
                    {c.category}
                  </span>
                </div>
                <div className="text-lg font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent)] transition-colors font-display">
                  {c.title}
                </div>
                <p className="text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">{c.description}</p>
                <div className="text-sm text-[var(--accent)] font-medium mt-4 flex items-center gap-1">
                  Calculate Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-[var(--text-muted)] py-20">No calculators match "{query}".</div>
        )}
      </section>
    </div>
  );
}
