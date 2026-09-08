import type { Metadata } from "next";
import FuelSavingsCalculator from "../../../calculators/utilities/FuelSavingsCalculator";
import tool from "../../../data/tools/utilities-fuel-savings-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FuelSavingsCalculator />
    </>
  );
}
