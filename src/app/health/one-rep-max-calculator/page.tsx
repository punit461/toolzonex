import type { Metadata } from "next";
import OneRepMaxCalculator from "../../../calculators/health/OneRepMaxCalculator";
import tool from "../../../data/tools/health-one-rep-max-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OneRepMaxCalculator />
    </>
  );
}
