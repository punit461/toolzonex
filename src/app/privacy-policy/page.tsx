import type { Metadata } from "next";
import PrivacyPolicy from "../../pages/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ToolZoneX privacy policy and data protection guidelines.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PrivacyPolicy />;
}
