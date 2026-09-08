import type { Metadata } from "next";
import VideoStreamingDataCalculator from "../../../calculators/utilities/VideoStreamingDataCalculator";
import tool from "../../../data/tools/utilities-video-streaming-data-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VideoStreamingDataCalculator />
    </>
  );
}
