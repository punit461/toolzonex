import type { Metadata } from "next";
import BMRCalculator from "../../../calculators/BMRCalculator";

export const metadata: Metadata = {
  title: "BMR Calculator",
  description: "Calculate your Basal Metabolic Rate.",
  alternates: { canonical: "/health/bmr-calculator" },
};

export default function Page() {
  return <BMRCalculator />;
}
