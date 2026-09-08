import type { Metadata } from "next";
import CartonCapacityCalculator from "../../../calculators/utilities/CartonCapacityCalculator";
import tool from "../../../data/tools/utilities-carton-capacity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CartonCapacityCalculator />
    </>
  );
}
