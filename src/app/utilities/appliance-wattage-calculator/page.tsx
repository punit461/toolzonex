import type { Metadata } from "next";
import ApplianceWattageCalculator from "../../../calculators/utilities/ApplianceWattageCalculator";
import tool from "../../../data/tools/utilities-appliance-wattage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ApplianceWattageCalculator />
    </>
  );
}
