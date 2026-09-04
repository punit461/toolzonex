import type { Metadata } from "next";
import YoutubeThumbnailRatioCalculator from "../../../calculators/utilities/YoutubeThumbnailRatioCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/youtube-thumbnail-ratio-calculator");

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
