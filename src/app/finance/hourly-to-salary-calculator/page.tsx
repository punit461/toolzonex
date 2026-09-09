import type { Metadata } from "next";
import HourlyToSalaryCalculator from "../../../calculators/finance/HourlyToSalaryCalculator";
import tool from "../../../data/tools/finance-hourly-to-salary-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HourlyToSalaryCalculator />
    </>
  );
}
