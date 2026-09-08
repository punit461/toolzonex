import type { Metadata } from "next";
import HotelCostCalculator from "../../../calculators/utilities/HotelCostCalculator";
import tool from "../../../data/tools/utilities-hotel-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HotelCostCalculator />
    </>
  );
}
