import type { Metadata } from "next";
import GstImpact from "../../../pages/blogs/GstImpact";

export const metadata: Metadata = {
  title: "Understanding GST in India",
  description: "A simple guide to GST slabs, calculations, and its impact on consumers.",
  alternates: { canonical: "/blog/understanding-gst" },
};

export default function Page() {
  return <GstImpact />;
}
