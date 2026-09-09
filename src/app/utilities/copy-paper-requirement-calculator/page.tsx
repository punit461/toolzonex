import type { Metadata } from "next";
import CopyPaperRequirementCalculator from "../../../calculators/utilities/CopyPaperRequirementCalculator";
import tool from "../../../data/tools/utilities-copy-paper-requirement-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CopyPaperRequirementCalculator />
    </>
  );
}
