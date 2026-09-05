import type { Metadata } from "next";
import VehicleLoanAffordabilityCalculator from "../../../calculators/finance/VehicleLoanAffordabilityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/vehicle-loan-affordability-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VehicleLoanAffordabilityCalculator />
    </>
  );
}
