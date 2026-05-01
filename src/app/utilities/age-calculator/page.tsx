import type { Metadata } from "next";
import AgeCalculator from "../../../calculators/AgeCalculator";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Calculate exact age.",
  alternates: { canonical: "/utilities/age-calculator" },
};

export default function Page() {
  return <AgeCalculator />;
}
