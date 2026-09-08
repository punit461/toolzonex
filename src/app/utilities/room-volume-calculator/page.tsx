import type { Metadata } from "next";
import RoomVolumeCalculator from "../../../calculators/utilities/RoomVolumeCalculator";
import tool from "../../../data/tools/utilities-room-volume-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RoomVolumeCalculator />
    </>
  );
}
