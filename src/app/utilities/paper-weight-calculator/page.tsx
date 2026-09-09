import type { Metadata } from "next";
import PaperWeightCalculator from "../../../calculators/utilities/PaperWeightCalculator";
import tool from "../../../data/tools/utilities-paper-weight-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaperWeightCalculator />
    </>
  );
}
