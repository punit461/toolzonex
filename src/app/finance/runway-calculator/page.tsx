import type { Metadata } from "next";
import RunwayCalculator from "../../../calculators/finance/RunwayCalculator";
import tool from "../../../data/tools/finance-runway-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RunwayCalculator />
    </>
  );
}
