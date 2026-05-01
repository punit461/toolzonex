import type { Metadata } from "next";
import UnderstandingGratuity from "../../../pages/blogs/UnderstandingGratuity";

export const metadata: Metadata = {
  title: "Understanding Gratuity in India",
  description: "Rules, eligibility, and tax exemptions for Gratuity.",
  alternates: { canonical: "/blog/understanding-gratuity-india" },
};

export default function Page() {
  return <UnderstandingGratuity />;
}
