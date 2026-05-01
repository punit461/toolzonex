import type { Metadata } from "next";
import PercentageCalculator from "../../../calculators/PercentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator",
  description: "Calculate percentages easily.",
  alternates: { canonical: "/utilities/percentage-calculator" },
};

export default function Page() {
  return <PercentageCalculator />;
}
