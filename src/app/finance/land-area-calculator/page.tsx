import type { Metadata } from "next";
import LandAreaCalculator from "../../../calculators/finance/LandAreaCalculator";
import tool from "../../../data/tools/finance-land-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LandAreaCalculator />
    </>
  );
}
