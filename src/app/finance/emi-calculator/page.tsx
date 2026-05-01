import type { Metadata } from "next";
import EMICalculator from "../../../calculators/EMICalculator";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description: "Calculate your monthly EMI for home, car, or personal loans.",
  alternates: { canonical: "/finance/emi-calculator" },
};

export default function Page() {
  return <EMICalculator />;
}
