import type { Metadata } from "next";
import WeeklyPlannerGenerator from "../../../calculators/generators/WeeklyPlannerGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/weekly-planner-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WeeklyPlannerGenerator />
    </>
  );
}
