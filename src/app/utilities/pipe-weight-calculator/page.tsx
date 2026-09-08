import type { Metadata } from "next";
import PipeWeightCalculator from "../../../calculators/utilities/PipeWeightCalculator";
import tool from "../../../data/tools/utilities-pipe-weight-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PipeWeightCalculator />
    </>
  );
}