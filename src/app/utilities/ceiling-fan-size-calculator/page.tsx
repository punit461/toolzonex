import type { Metadata } from "next";
import CeilingFanSizeCalculator from "../../../calculators/utilities/CeilingFanSizeCalculator";
import tool from "../../../data/tools/utilities-ceiling-fan-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CeilingFanSizeCalculator />
    </>
  );
}
