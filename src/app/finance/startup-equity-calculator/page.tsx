import type { Metadata } from "next";
import StartupEquityCalculator from "../../../calculators/finance/StartupEquityCalculator";
import tool from "../../../data/tools/finance-startup-equity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <StartupEquityCalculator />
    </>
  );
}
