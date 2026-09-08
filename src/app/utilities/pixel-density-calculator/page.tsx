import type { Metadata } from "next";
import PixelDensityCalculator from "../../../calculators/utilities/PixelDensityCalculator";
import tool from "../../../data/tools/utilities-pixel-density-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PixelDensityCalculator />
    </>
  );
}
