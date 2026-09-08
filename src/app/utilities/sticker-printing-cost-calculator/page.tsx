import type { Metadata } from "next";
import StickerPrintingCostCalculator from "../../../calculators/utilities/StickerPrintingCostCalculator";
import tool from "../../../data/tools/utilities-sticker-printing-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StickerPrintingCostCalculator />
    </>
  );
}
