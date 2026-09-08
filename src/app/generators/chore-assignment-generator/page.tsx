import type { Metadata } from "next";
import ChoreAssignmentGenerator from "../../../calculators/generators/ChoreAssignmentGenerator";
import tool from "../../../data/tools/generators-chore-assignment-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ChoreAssignmentGenerator />
    </>
  );
}
