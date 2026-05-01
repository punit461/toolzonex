import type { Metadata } from "next";
import BudgetingRule from "../../../pages/blogs/BudgetingRule";

export const metadata: Metadata = {
  title: "The 50/30/20 Budgeting Rule",
  description: "How to manage your money effectively using the 50/30/20 rule.",
  alternates: { canonical: "/blog/50-30-20-budgeting-rule" },
};

export default function Page() {
  return <BudgetingRule />;
}
