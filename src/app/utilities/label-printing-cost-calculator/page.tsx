import type { Metadata } from "next";
import LabelPrintingCostCalculator from "../../../calculators/utilities/LabelPrintingCostCalculator";
import tool from "../../../data/tools/utilities-label-printing-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LabelPrintingCostCalculator />
    </>
  );
}
