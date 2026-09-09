import type { Metadata } from "next";
import InkUsageCalculator from "../../../calculators/utilities/InkUsageCalculator";
import tool from "../../../data/tools/utilities-ink-usage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InkUsageCalculator />
    </>
  );
}
