import type { Metadata } from "next";
import OldVsNewTax from "../../../pages/blogs/OldVsNewTax";

export const metadata: Metadata = {
  title: "Old vs New Tax Regime: Which is Better?",
  description: "A comprehensive comparison to help you choose the best tax regime for your income.",
  alternates: { canonical: "/blog/old-vs-new-tax-regime" },
};

export default function Page() {
  return <OldVsNewTax />;
}
