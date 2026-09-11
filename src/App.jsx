import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CalculatorPage from "./pages/CalculatorPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0c10]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators/:slug" element={<CalculatorPage />} />
      </Routes>
      <footer className="border-t border-[#1f2028] mt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 text-xs text-gray-600">
          Free financial calculators for India. Formulas are standard, publicly documented calculations — not
          personalised financial advice.
        </div>
      </footer>
    </div>
  );
}
