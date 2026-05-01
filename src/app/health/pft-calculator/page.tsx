import type { Metadata } from "next";
import PFTCalculator from "../../../calculators/PFTCalculator";

export const metadata: Metadata = {
  title: "PFT Calculator",
  description: "Physical Fitness Test calculator.",
  alternates: { canonical: "/health/pft-calculator" },
};

export default function Page() {
  return <PFTCalculator />;
}
