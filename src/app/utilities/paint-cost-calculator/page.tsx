import type { Metadata } from "next";
import PaintCostCalculator from "../../../calculators/utilities/PaintCostCalculator";
import tool from "../../../data/tools/utilities-paint-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaintCostCalculator />
    </>
  );
}
