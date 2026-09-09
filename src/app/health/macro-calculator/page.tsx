import type { Metadata } from "next";
import MacroCalculator from "../../../calculators/health/MacroCalculator";
import tool from "../../../data/tools/health-macro-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MacroCalculator />
    </>
  );
}
