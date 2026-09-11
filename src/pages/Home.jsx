import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CALCULATORS } from "../data/calculators";

const CATEGORY_COLOR = {
  Investment: "text-violet-400 bg-violet-500/10",
  Savings: "text-emerald-400 bg-emerald-500/10",
  Tax: "text-amber-400 bg-amber-500/10",
  "Loans & EMI": "text-cyan-400 bg-cyan-500/10",
  Trading: "text-fuchsia-400 bg-fuchsia-500/10",
};

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

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Free Tools</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">Financial Calculators</h1>
      <p className="text-gray-500 max-w-xl mb-8">
        {CALCULATORS.length} free tools — SIP, EMI, tax, FD, and more. Run the numbers before you decide anything.
        No account needed.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calculators — SIP, EMI, Tax…"
        className="w-full max-w-md bg-[#15161d] border border-[#2b2d3a] rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 mb-5 focus:outline-none focus:border-violet-500"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3.5 py-1.5 rounded-lg text-sm border transition-colors ${
              category === c
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-[#15161d] border-[#2b2d3a] text-gray-400 hover:border-violet-500/50"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-600 self-center">{filtered.length} calculators</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            to={`/calculators/${c.slug}`}
            className="group bg-[#15161d] border border-[#2b2d3a] rounded-2xl p-5 hover:border-violet-500/50 transition-colors flex flex-col"
          >
            <span
              className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full w-fit mb-3 ${CATEGORY_COLOR[c.category]}`}
            >
              {c.category}
            </span>
            <div className="text-lg font-semibold text-gray-100 mb-1.5 group-hover:text-violet-300 transition-colors">
              {c.title}
            </div>
            <p className="text-sm text-gray-500 flex-1">{c.description}</p>
            <div className="text-sm text-violet-400 font-medium mt-4 flex items-center gap-1">
              Calculate Now <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-20">No calculators match "{query}".</div>
      )}
    </div>
  );
}
