import type { Metadata } from "next";
import NewRegime2025 from "../../../pages/blogs/NewRegime2025";

export const metadata: Metadata = {
  title: "New Tax Regime FY 2025-26",
  description: "Latest changes and slabs in the new tax regime.",
  alternates: { canonical: "/blog/new-tax-regime-fy-2025-26" },
};

export default function Page() {
  return <NewRegime2025 />;
}
