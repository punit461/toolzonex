import type { Metadata } from "next";
import RoomLightingCalculator from "../../../calculators/utilities/RoomLightingCalculator";
import tool from "../../../data/tools/utilities-room-lighting-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RoomLightingCalculator />
    </>
  );
}
