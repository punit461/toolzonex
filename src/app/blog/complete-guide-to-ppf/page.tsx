import type { Metadata } from "next";
import PpfGuide from "../../../pages/blogs/PpfGuide";

export const metadata: Metadata = {
  title: "Complete Guide to PPF",
  description: "Everything you need to know about investing in the Public Provident Fund.",
  alternates: { canonical: "/blog/complete-guide-to-ppf" },
};

export default function Page() {
  return <PpfGuide />;
}
