import type { Metadata } from "next";
import BMRCalculator from "../../../calculators/health/BMRCalculator";
import tool from "../../../data/tools/health-bmr-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BMRCalculator />
    </>
  );
}
