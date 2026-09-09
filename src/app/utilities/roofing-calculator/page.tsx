import type { Metadata } from "next";
import RoofingCalculator from "../../../calculators/utilities/RoofingCalculator";
import tool from "../../../data/tools/utilities-roofing-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RoofingCalculator />
    </>
  );
}
