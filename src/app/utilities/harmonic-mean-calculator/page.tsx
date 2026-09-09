import type { Metadata } from "next";
import HarmonicMeanCalculator from "../../../calculators/utilities/HarmonicMeanCalculator";
import tool from "../../../data/tools/utilities-harmonic-mean-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HarmonicMeanCalculator />
    </>
  );
}
