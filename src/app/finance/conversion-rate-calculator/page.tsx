import type { Metadata } from "next";
import ConversionRateCalculator from "../../../calculators/finance/ConversionRateCalculator";
import tool from "../../../data/tools/finance-conversion-rate-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConversionRateCalculator />
    </>
  );
}
