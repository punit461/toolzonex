import type { Metadata } from "next";
import TDEECalculator from "../../../calculators/TDEECalculator";

export const metadata: Metadata = {
  title: "TDEE Calculator",
  description: "Calculate Total Daily Energy Expenditure.",
  alternates: { canonical: "/health/tdee-calculator" },
};

export default function Page() {
  return <TDEECalculator />;
}
