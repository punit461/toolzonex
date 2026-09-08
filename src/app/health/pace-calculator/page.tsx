import type { Metadata } from "next";
import PaceCalculator from "../../../calculators/health/PaceCalculator";
import tool from "../../../data/tools/health-pace-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaceCalculator />
    </>
  );
}
