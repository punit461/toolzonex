import type { Metadata } from "next";
import IncomeTaxCalculator from "../../../calculators/IncomeTaxCalculator";

export const metadata: Metadata = {
  title: "Income Tax Calculator",
  description: "Calculate your income tax under new vs old regime.",
  alternates: { canonical: "/finance/income-tax-calculator" },
};

export default function Page() {
  return <IncomeTaxCalculator />;
}
