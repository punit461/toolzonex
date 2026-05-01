import type { Metadata } from "next";
import GratuityCalculator from "../../../calculators/GratuityCalculator";

export const metadata: Metadata = {
  title: "Gratuity Calculator",
  description: "Calculate your gratuity amount.",
  alternates: { canonical: "/finance/gratuity-calculator" },
};

export default function Page() {
  return <GratuityCalculator />;
}
