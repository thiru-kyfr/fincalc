import { useParams, Link } from "react-router-dom";
import { CALCULATOR_COMPONENTS } from "../calculators/registry";

export default function CalculatorPage() {
  const { slug } = useParams();
  const Component = CALCULATOR_COMPONENTS[slug];

  if (!Component) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-2xl font-bold text-[var(--text-primary)] mb-2">Calculator not found</div>
        <p className="text-[var(--text-muted)] mb-6">We couldn't find a calculator at "{slug}".</p>
        <Link to="/" className="text-[var(--accent)] hover:opacity-80 text-sm font-medium">
          ← Back to all calculators
        </Link>
      </div>
    );
  }

  return <Component />;
}
