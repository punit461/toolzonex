import type { Metadata } from "next";
import BodyFatCalculator from "../../../calculators/health/BodyFatCalculator";
import tool from "../../../data/tools/health-body-fat-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BodyFatCalculator />
    </>
  );
}
