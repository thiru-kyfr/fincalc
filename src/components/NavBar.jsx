import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[#08090d]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-[var(--text-primary)]">
          <Logo size={30} />
          <span className="font-display font-bold text-lg tracking-tight">Ktools</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            All Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
