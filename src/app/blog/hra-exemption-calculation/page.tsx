import type { Metadata } from "next";
import HraExemption from "../../../pages/blogs/HraExemption";

export const metadata: Metadata = {
  title: "HRA Exemption Calculation",
  description: "Step-by-step guide to calculating House Rent Allowance exemption.",
  alternates: { canonical: "/blog/hra-exemption-calculation" },
};

export default function Page() {
  return <HraExemption />;
}
