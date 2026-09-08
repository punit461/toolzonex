import type { Metadata } from "next";
import EBITDACalculator from "../../../calculators/finance/EBITDACalculator";
import tool from "../../../data/tools/finance-ebitda-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EBITDACalculator />
    </>
  );
}
