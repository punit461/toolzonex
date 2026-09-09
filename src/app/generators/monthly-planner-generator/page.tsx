import type { Metadata } from "next";
import MonthlyPlannerGenerator from "../../../calculators/generators/MonthlyPlannerGenerator";
import tool from "../../../data/tools/generators-monthly-planner-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MonthlyPlannerGenerator />
    </>
  );
}
