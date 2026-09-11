import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="border-b border-[#1f2028] sticky top-0 z-10 bg-[#0b0c10]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-100 font-semibold">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 inline-block" />
          FinCalc
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-gray-100 transition-colors">
            Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
