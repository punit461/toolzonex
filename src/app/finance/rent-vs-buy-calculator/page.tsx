import type { Metadata } from "next";
import RentVsBuyCalculator from "../../../calculators/RentVsBuyCalculator";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator",
  description: "Compare renting vs buying a home.",
  alternates: { canonical: "/finance/rent-vs-buy-calculator" },
};

export default function Page() {
  return <RentVsBuyCalculator />;
}
