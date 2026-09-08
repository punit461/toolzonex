import type { Metadata } from "next";
import AquariumVolumeCalculator from "../../../calculators/utilities/AquariumVolumeCalculator";
import tool from "../../../data/tools/utilities-aquarium-volume-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AquariumVolumeCalculator />
    </>
  );
}
