import type { Metadata } from "next";
import ShippingCostEstimator from "../../../calculators/finance/ShippingCostEstimator";
import tool from "../../../data/tools/finance-shipping-cost-estimator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ShippingCostEstimator />
    </>
  );
}
