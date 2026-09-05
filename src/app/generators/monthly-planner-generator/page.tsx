import type { Metadata } from "next";
import MonthlyPlannerGenerator from "../../../calculators/generators/MonthlyPlannerGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/monthly-planner-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MonthlyPlannerGenerator />
    </>
  );
}
