import type { Metadata } from "next";
import CarDepreciationCalculator from "../../../calculators/utilities/CarDepreciationCalculator";
import tool from "../../../data/tools/utilities-car-depreciation-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CarDepreciationCalculator />
    </>
  );
}
