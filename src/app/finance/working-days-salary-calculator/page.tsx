import type { Metadata } from "next";
import WorkingDaysSalaryCalculator from "../../../calculators/finance/WorkingDaysSalaryCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/working-days-salary-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WorkingDaysSalaryCalculator />
    </>
  );
}
