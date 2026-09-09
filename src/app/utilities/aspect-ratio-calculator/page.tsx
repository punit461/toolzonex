import type { Metadata } from "next";
import AspectRatioCalculator from "../../../calculators/utilities/AspectRatioCalculator";
import tool from "../../../data/tools/utilities-aspect-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AspectRatioCalculator />
    </>
  );
}
