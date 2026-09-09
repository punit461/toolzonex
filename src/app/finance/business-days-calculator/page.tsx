import type { Metadata } from "next";
import BusinessDaysCalculator from "../../../calculators/finance/BusinessDaysCalculator";
import tool from "../../../data/tools/finance-business-days-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BusinessDaysCalculator />
    </>
  );
}
