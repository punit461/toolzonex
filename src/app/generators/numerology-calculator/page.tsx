import type { Metadata } from "next";
import NumerologyCalculator from "../../../calculators/generators/NumerologyCalculator";
import tool from "../../../data/tools/generators-numerology-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NumerologyCalculator />
    </>
  );
}
