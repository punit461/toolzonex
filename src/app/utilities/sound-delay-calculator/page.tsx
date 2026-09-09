import type { Metadata } from "next";
import SoundDelayCalculator from "../../../calculators/utilities/SoundDelayCalculator";
import tool from "../../../data/tools/utilities-sound-delay-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SoundDelayCalculator />
    </>
  );
}
