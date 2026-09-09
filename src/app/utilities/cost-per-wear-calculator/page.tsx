import type { Metadata } from "next";
import CostPerWearCalculator from "../../../calculators/utilities/CostPerWearCalculator";
import tool from "../../../data/tools/utilities-cost-per-wear-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CostPerWearCalculator />
    </>
  );
}
