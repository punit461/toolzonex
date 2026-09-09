import type { Metadata } from "next";
import BackpackWeightCalculator from "../../../calculators/utilities/BackpackWeightCalculator";
import tool from "../../../data/tools/utilities-backpack-weight-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BackpackWeightCalculator />
    </>
  );
}
