import type { Metadata } from "next";
import BeamLoadCalculator from "../../../calculators/utilities/BeamLoadCalculator";
import tool from "../../../data/tools/utilities-beam-load-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BeamLoadCalculator />
    </>
  );
}
