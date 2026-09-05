import type { Metadata } from "next";
import RainGutterCapacityCalculator from "../../../calculators/utilities/RainGutterCapacityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/rain-gutter-capacity-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RainGutterCapacityCalculator />
    </>
  );
}
