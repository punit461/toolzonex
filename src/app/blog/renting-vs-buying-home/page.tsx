import type { Metadata } from "next";
import RentingVsBuying from "../../../pages/blogs/RentingVsBuying";

export const metadata: Metadata = {
  title: "Renting vs Buying a Home",
  description: "Financial analysis to help you decide between renting and buying real estate.",
  alternates: { canonical: "/blog/renting-vs-buying-home" },
};

export default function Page() {
  return <RentingVsBuying />;
}
