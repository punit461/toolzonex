import type { Metadata } from "next";
import MusicStreamingDataCalculator from "../../../calculators/utilities/MusicStreamingDataCalculator";
import tool from "../../../data/tools/utilities-music-streaming-data-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MusicStreamingDataCalculator />
    </>
  );
}
