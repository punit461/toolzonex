import type { Metadata } from "next";
import VacationSavingsCalculator from "../../../calculators/finance/VacationSavingsCalculator";
import tool from "../../../data/tools/finance-vacation-savings-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VacationSavingsCalculator />
    </>
  );
}
