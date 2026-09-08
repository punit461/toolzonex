import type { Metadata } from "next";
import CloudStorageCostCalculator from "../../../calculators/finance/CloudStorageCostCalculator";
import tool from "../../../data/tools/finance-cloud-storage-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CloudStorageCostCalculator />
    </>
  );
}
