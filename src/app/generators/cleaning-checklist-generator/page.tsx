import type { Metadata } from "next";
import CleaningChecklistGenerator from "../../../calculators/generators/CleaningChecklistGenerator";
import tool from "../../../data/tools/generators-cleaning-checklist-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CleaningChecklistGenerator />
    </>
  );
}
