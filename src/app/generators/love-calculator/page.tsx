import type { Metadata } from "next";
import LoveCalculator from "../../../calculators/generators/LoveCalculator";
import tool from "../../../data/tools/generators-love-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LoveCalculator />
    </>
  );
}
