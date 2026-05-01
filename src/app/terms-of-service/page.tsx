import type { Metadata } from "next";
import TermsOfService from "../../pages/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using ToolZoneX tools and calculators.",
  alternates: { canonical: "/terms-of-service" },
};

export default function Page() {
  return <TermsOfService />;
}
