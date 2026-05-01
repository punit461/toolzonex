import type { Metadata } from "next";
import PPFCalculator from "../../../calculators/PPFCalculator";

export const metadata: Metadata = {
  title: "PPF Calculator",
  description: "Calculate Public Provident Fund returns.",
  alternates: { canonical: "/finance/ppf-calculator" },
};

export default function Page() {
  return <PPFCalculator />;
}
