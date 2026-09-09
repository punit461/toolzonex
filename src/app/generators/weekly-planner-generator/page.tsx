import type { Metadata } from "next";
import WeeklyPlannerGenerator from "../../../calculators/generators/WeeklyPlannerGenerator";
import tool from "../../../data/tools/generators-weekly-planner-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WeeklyPlannerGenerator />
    </>
  );
}
