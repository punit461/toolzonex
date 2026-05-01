import type { Metadata } from "next";
import FAQ from "../../pages/FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about ToolZoneX calculators.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return <FAQ />;
}
