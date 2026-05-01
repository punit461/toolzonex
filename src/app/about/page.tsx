import type { Metadata } from "next";
import About from "../../pages/About";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about ToolZoneX and our mission to build smart tools.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
