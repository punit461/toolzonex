import type { Metadata } from "next";
import DecimalToFractionCalculator from "../../../calculators/utilities/DecimalToFractionCalculator";
import tool from "../../../data/tools/utilities-decimal-to-fraction-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DecimalToFractionCalculator />
    </>
  );
}
