import type { Metadata } from "next";
import ChecklistGenerator from "../../../calculators/generators/ChecklistGenerator";
import tool from "../../../data/tools/generators-checklist-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ChecklistGenerator />
    </>
  );
}
