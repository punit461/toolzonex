import type { Metadata } from "next";
import TipCalculator from "../../../calculators/utilities/TipCalculator";
import tool from "../../../data/tools/utilities-tip-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TipCalculator />
    </>
  );
}
