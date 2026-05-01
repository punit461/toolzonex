import type { Metadata } from "next";
import SalaryIncrementCalculator from "../../../calculators/SalaryIncrementCalculator";

export const metadata: Metadata = {
  title: "Salary Increment Calculator",
  description: "Calculate your new CTC and take-home salary after an increment.",
  alternates: { canonical: "/finance/salary-increment-calculator" },
};

export default function Page() {
  return <SalaryIncrementCalculator />;
}
