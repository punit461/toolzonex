import type { Metadata } from "next";
import MovingChecklistGenerator from "../../../calculators/generators/MovingChecklistGenerator";
import tool from "../../../data/tools/generators-moving-checklist-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MovingChecklistGenerator />
    </>
  );
}
