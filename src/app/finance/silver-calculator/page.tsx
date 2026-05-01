import type { Metadata } from "next";
import SilverRateCalculator from "../../../calculators/SilverRateCalculator";

export const metadata: Metadata = {
  title: "Silver Rate Calculator",
  description: "Calculate silver price with making charges.",
  alternates: { canonical: "/finance/silver-calculator" },
};

export default function Page() {
  return <SilverRateCalculator />;
}
