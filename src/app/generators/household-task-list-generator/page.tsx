import type { Metadata } from "next";
import HouseholdTaskListGenerator from "../../../calculators/generators/HouseholdTaskListGenerator";
import tool from "../../../data/tools/generators-household-task-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HouseholdTaskListGenerator />
    </>
  );
}
