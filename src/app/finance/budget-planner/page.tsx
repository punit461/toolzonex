import type { Metadata } from "next";
import BudgetPlanner from "../../../calculators/finance/BudgetPlanner";
import tool from "../../../data/tools/finance-budget-planner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BudgetPlanner />
    </>
  );
}
