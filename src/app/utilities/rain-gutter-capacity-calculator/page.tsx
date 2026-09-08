import type { Metadata } from "next";
import RainGutterCapacityCalculator from "../../../calculators/utilities/RainGutterCapacityCalculator";
import tool from "../../../data/tools/utilities-rain-gutter-capacity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RainGutterCapacityCalculator />
    </>
  );
}
