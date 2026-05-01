import type { Metadata } from "next";
import CFTCalculator from "../../../calculators/CFTCalculator";

export const metadata: Metadata = {
  title: "CFT Calculator",
  description: "Combat Fitness Test calculator.",
  alternates: { canonical: "/health/cft-calculator" },
};

export default function Page() {
  return <CFTCalculator />;
}
