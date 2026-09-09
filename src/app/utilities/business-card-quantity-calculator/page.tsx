import type { Metadata } from "next";
import BusinessCardQuantityCalculator from "../../../calculators/utilities/BusinessCardQuantityCalculator";
import tool from "../../../data/tools/utilities-business-card-quantity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BusinessCardQuantityCalculator />
    </>
  );
}
