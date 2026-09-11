import { Link } from "react-router-dom";

export default function CalculatorShell({ title, description, category, inputs, children }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
        <Link to="/" className="hover:text-violet-400">
          Calculators
        </Link>
        <span>/</span>
        <span className="text-gray-400">{category}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-1">{title}</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-2xl">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <div className="bg-[#15161d] border border-[#2b2d3a] rounded-2xl p-5 h-fit">
          <div className="text-sm font-semibold text-gray-200 mb-5">Enter Details</div>
          {inputs}
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}
