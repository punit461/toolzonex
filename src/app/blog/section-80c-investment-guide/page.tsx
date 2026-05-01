import type { Metadata } from "next";
import Section80CGuide from "../../../pages/blogs/Section80CGuide";

export const metadata: Metadata = {
  title: "Section 80C Investment Guide",
  description: "Best investment options to save tax under Section 80C.",
  alternates: { canonical: "/blog/section-80c-investment-guide" },
};

export default function Page() {
  return <Section80CGuide />;
}
