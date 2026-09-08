import type { Metadata } from "next";
import NormalDistributionCalculator from "../../../calculators/utilities/NormalDistributionCalculator";
import tool from "../../../data/tools/utilities-normal-distribution-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NormalDistributionCalculator />
    </>
  );
}
