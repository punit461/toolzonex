import type { Metadata } from "next";
import CompoundInterest from "../../../pages/blogs/CompoundInterest";

export const metadata: Metadata = {
  title: "The Power of Compound Interest",
  description: "How compounding works and why starting early is the key to wealth generation.",
  alternates: { canonical: "/blog/power-of-compound-interest" },
};

export default function Page() {
  return <CompoundInterest />;
}
