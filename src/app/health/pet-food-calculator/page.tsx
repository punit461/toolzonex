import type { Metadata } from "next";
import PetFoodCalculator from "../../../calculators/health/PetFoodCalculator";
import tool from "../../../data/tools/health-pet-food-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PetFoodCalculator />
    </>
  );
}
