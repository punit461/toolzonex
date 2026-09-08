import type { Metadata } from "next";
import YoutubeThumbnailRatioCalculator from "../../../calculators/utilities/YoutubeThumbnailRatioCalculator";
import tool from "../../../data/tools/utilities-youtube-thumbnail-ratio-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <YoutubeThumbnailRatioCalculator />
    </>
  );
}
