import type { Metadata } from "next";
import CopyPaperRequirementCalculator from "../../../calculators/utilities/CopyPaperRequirementCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/copy-paper-requirement-calculator");

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
