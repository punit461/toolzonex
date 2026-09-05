import type { Metadata } from "next";
import RainfallCollectionCalculator from "../../../calculators/utilities/RainfallCollectionCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/rainfall-collection-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RainfallCollectionCalculator />
    </>
  );
}
