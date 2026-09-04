import type { Metadata } from "next";
import DepthOfFieldCalculator from "../../../calculators/utilities/DepthOfFieldCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/depth-of-field-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DepthOfFieldCalculator />
    </>
  );
}
