import type { Metadata } from "next";
import PaceToSpeedCalculator from "../../../calculators/utilities/PaceToSpeedCalculator";
import tool from "../../../data/tools/utilities-pace-to-speed-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaceToSpeedCalculator />
    </>
  );
}
