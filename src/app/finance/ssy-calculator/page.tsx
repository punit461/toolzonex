import type { Metadata } from "next";
import SSYCalculator from "../../../calculators/SSYCalculator";

export const metadata: Metadata = {
  title: "SSY Calculator",
  description: "Sukanya Samriddhi Yojana calculator.",
  alternates: { canonical: "/finance/ssy-calculator" },
};

export default function Page() {
  return <SSYCalculator />;
}
