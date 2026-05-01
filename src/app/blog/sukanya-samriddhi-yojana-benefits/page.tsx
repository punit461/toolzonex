import type { Metadata } from "next";
import SsyBenefits from "../../../pages/blogs/SsyBenefits";

export const metadata: Metadata = {
  title: "Sukanya Samriddhi Yojana Benefits",
  description: "A detailed look at the SSY scheme for the girl child.",
  alternates: { canonical: "/blog/sukanya-samriddhi-yojana-benefits" },
};

export default function Page() {
  return <SsyBenefits />;
}
