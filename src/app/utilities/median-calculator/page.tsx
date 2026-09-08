import type { Metadata } from "next";
import MedianCalculator from "../../../calculators/utilities/MedianCalculator";
import tool from "../../../data/tools/utilities-median-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MedianCalculator />
    </>
  );
}
