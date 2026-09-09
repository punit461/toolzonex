import type { Metadata } from "next";
import CakeServingCalculator from "../../../calculators/utilities/CakeServingCalculator";
import tool from "../../../data/tools/utilities-cake-serving-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CakeServingCalculator />
    </>
  );
}
