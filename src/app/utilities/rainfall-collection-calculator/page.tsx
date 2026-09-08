import type { Metadata } from "next";
import RainfallCollectionCalculator from "../../../calculators/utilities/RainfallCollectionCalculator";
import tool from "../../../data/tools/utilities-rainfall-collection-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RainfallCollectionCalculator />
    </>
  );
}
