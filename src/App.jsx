import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Home from "./pages/Home";
import CalculatorPage from "./pages/CalculatorPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators/:slug" element={<CalculatorPage />} />
      </Routes>
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <Logo size={20} />
            <span className="font-display font-semibold text-[var(--text-primary)]">Ktools</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-md">
            Free financial calculators for India. Formulas are standard, publicly documented calculations — not
            personalised financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
