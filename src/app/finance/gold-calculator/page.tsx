import type { Metadata } from "next";
import GoldRateCalculator from "../../../calculators/GoldRateCalculator";

export const metadata: Metadata = {
  title: "Gold Rate Calculator",
  description: "Calculate gold price with making charges.",
  alternates: { canonical: "/finance/gold-calculator" },
};

export default function Page() {
  return <GoldRateCalculator />;
}
