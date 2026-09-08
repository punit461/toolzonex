import type { Metadata } from "next";
import LinearRegressionCalculator from "../../../calculators/utilities/LinearRegressionCalculator";
import tool from "../../../data/tools/utilities-linear-regression-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LinearRegressionCalculator />
    </>
  );
}
