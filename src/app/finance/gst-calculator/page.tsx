import type { Metadata } from "next";
import GSTCalculator from "../../../calculators/GSTCalculator";

export const metadata: Metadata = {
  title: "GST Calculator",
  description: "Calculate GST amount easily.",
  alternates: { canonical: "/finance/gst-calculator" },
};

export default function Page() {
  return <GSTCalculator />;
}
