import type { Metadata } from "next";
import RentalPropertyROICalculator from "../../../calculators/finance/RentalPropertyROICalculator";
import tool from "../../../data/tools/finance-rental-property-roi-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RentalPropertyROICalculator />
    </>
  );
}
