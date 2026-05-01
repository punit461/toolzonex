import type { Metadata } from "next";
import Contact from "../../pages/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ToolZoneX team.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <Contact />;
}
