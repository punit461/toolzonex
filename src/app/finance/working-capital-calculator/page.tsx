import type { Metadata } from "next";
import WorkingCapitalCalculator from "../../../calculators/finance/WorkingCapitalCalculator";
import tool from "../../../data/tools/finance-working-capital-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WorkingCapitalCalculator />
    </>
  );
}
