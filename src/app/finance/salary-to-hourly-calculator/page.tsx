import type { Metadata } from "next";
import SalaryToHourlyCalculator from "../../../calculators/finance/SalaryToHourlyCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/salary-to-hourly-calculator");

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
