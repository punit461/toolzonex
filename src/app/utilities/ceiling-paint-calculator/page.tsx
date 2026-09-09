import type { Metadata } from "next";
import CeilingPaintCalculator from "../../../calculators/utilities/CeilingPaintCalculator";
import tool from "../../../data/tools/utilities-ceiling-paint-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CeilingPaintCalculator />
    </>
  );
}
