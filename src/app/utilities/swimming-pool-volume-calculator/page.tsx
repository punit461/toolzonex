import type { Metadata } from "next";
import SwimmingPoolVolumeCalculator from "../../../calculators/utilities/SwimmingPoolVolumeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/swimming-pool-volume-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SwimmingPoolVolumeCalculator />
    </>
  );
}
