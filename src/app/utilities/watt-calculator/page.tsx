import type { Metadata } from "next";
import WattCalculator from "../../../calculators/utilities/WattCalculator";
import tool from "../../../data/tools/utilities-watt-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WattCalculator />
    </>
  );
}
