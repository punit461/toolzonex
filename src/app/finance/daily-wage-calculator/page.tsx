import type { Metadata } from "next";
import DailyWageCalculator from "../../../calculators/finance/DailyWageCalculator";
import tool from "../../../data/tools/finance-daily-wage-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DailyWageCalculator />
    </>
  );
}
