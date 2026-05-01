import type { Metadata } from "next";
import BMICalculator from "../../../calculators/BMICalculator";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index.",
  alternates: { canonical: "/health/bmi-calculator" },
};

export default function Page() {
  return <BMICalculator />;
}
