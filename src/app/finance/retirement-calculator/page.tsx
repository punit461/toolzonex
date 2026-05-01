import type { Metadata } from "next";
import RetirementCalculator from "../../../calculators/RetirementCalculator";

export const metadata: Metadata = {
  title: "Retirement Calculator",
  description: "Calculate corpus needed for retirement and monthly savings required.",
  alternates: { canonical: "/finance/retirement-calculator" },
};

export default function Page() {
  return <RetirementCalculator />;
}
