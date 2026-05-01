import type { Metadata } from "next";
import SipRetirement from "../../../pages/blogs/SipRetirement";

export const metadata: Metadata = {
  title: "How to Use SIP for Early Retirement",
  description: "Learn how to leverage Systematic Investment Plans (SIP) to achieve financial independence and retire early.",
  alternates: { canonical: "/blog/sip-early-retirement" },
};

export default function Page() {
  return <SipRetirement />;
}
