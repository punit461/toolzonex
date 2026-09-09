import type { Metadata } from "next";
import ReturnOnAssetsCalculator from "../../../calculators/finance/ReturnOnAssetsCalculator";
import tool from "../../../data/tools/finance-return-on-assets-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ReturnOnAssetsCalculator />
    </>
  );
}
