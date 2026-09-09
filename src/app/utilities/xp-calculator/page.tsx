import type { Metadata } from "next";
import XpCalculator from "../../../calculators/utilities/XpCalculator";
import tool from "../../../data/tools/utilities-xp-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <XpCalculator />
    </>
  );
}
