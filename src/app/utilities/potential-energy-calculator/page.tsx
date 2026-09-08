import type { Metadata } from "next";
import PotentialEnergyCalculator from "../../../calculators/utilities/PotentialEnergyCalculator";
import tool from "../../../data/tools/utilities-potential-energy-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PotentialEnergyCalculator />
    </>
  );
}
