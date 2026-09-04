import type { Metadata } from "next";
import HomeEnergyUsageCalculator from "../../../calculators/utilities/HomeEnergyUsageCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/home-energy-usage-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HomeEnergyUsageCalculator />
    </>
  );
}
