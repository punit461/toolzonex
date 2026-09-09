import type { Metadata } from "next";
import GoalTrackerGenerator from "../../../calculators/generators/GoalTrackerGenerator";
import tool from "../../../data/tools/generators-goal-tracker-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GoalTrackerGenerator />
    </>
  );
}
