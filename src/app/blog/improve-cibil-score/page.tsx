import type { Metadata } from "next";
import ImproveCibilScore from "../../../pages/blogs/ImproveCibilScore";

export const metadata: Metadata = {
  title: "How to Improve Your CIBIL Score",
  description: "Practical steps to boost your credit score fast.",
  alternates: { canonical: "/blog/improve-cibil-score" },
};

export default function Page() {
  return <ImproveCibilScore />;
}
