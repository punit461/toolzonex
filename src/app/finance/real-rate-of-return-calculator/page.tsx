import type { Metadata } from "next";
import RealRateOfReturnCalculator from "../../../calculators/finance/RealRateOfReturnCalculator";
import tool from "../../../data/tools/finance-real-rate-of-return-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RealRateOfReturnCalculator />
    </>
  );
}
