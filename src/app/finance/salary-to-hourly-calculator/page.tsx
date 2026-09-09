import type { Metadata } from "next";
import SalaryToHourlyCalculator from "../../../calculators/finance/SalaryToHourlyCalculator";
import tool from "../../../data/tools/finance-salary-to-hourly-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SalaryToHourlyCalculator />
    </>
  );
}
