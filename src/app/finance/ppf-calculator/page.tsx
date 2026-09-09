import type { Metadata } from "next";
import PPFCalculator from "../../../calculators/finance/PPFCalculator";
import tool from "../../../data/tools/finance-ppf-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PPFCalculator />
    </>
  );
}
