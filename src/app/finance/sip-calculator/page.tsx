import type { Metadata } from "next";
import SIPCalculator from "../../../calculators/SIPCalculator";

export const metadata: Metadata = {
  title: "SIP Calculator",
  description: "Calculate mutual fund SIP returns.",
  alternates: { canonical: "/finance/sip-calculator" },
};

export default function Page() {
  return <SIPCalculator />;
}
