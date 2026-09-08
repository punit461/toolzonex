import type { Metadata } from "next";
import SolarPanelCalculator from "../../../calculators/utilities/SolarPanelCalculator";
import tool from "../../../data/tools/utilities-solar-panel-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SolarPanelCalculator />
    </>
  );
}
