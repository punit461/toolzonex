import type { Metadata } from "next";
import PriorityListGenerator from "../../../calculators/generators/PriorityListGenerator";
import tool from "../../../data/tools/generators-priority-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PriorityListGenerator />
    </>
  );
}
