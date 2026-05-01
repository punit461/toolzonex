import type { Metadata } from "next";
import DateCalculator from "../../../calculators/DateCalculator";

export const metadata: Metadata = {
  title: "Date Calculator",
  description: "Add/subtract days from a date.",
  alternates: { canonical: "/utilities/date-calculator" },
};

export default function Page() {
  return <DateCalculator />;
}
