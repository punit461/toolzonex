import type { Metadata } from "next";
import PipeVolumeCalculator from "../../../calculators/utilities/PipeVolumeCalculator";
import tool from "../../../data/tools/utilities-pipe-volume-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PipeVolumeCalculator />
    </>
  );
}