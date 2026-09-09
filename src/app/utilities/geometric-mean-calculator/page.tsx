import type { Metadata } from "next";
import GeometricMeanCalculator from "../../../calculators/utilities/GeometricMeanCalculator";
import tool from "../../../data/tools/utilities-geometric-mean-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GeometricMeanCalculator />
    </>
  );
}
