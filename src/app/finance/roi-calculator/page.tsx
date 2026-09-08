import type { Metadata } from "next";
import ROICalculator from "../../../calculators/finance/ROICalculator";
import tool from "../../../data/tools/finance-roi-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ROICalculator />
    </>
  );
}
