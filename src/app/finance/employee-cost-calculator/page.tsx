import type { Metadata } from "next";
import EmployeeCostCalculator from "../../../calculators/finance/EmployeeCostCalculator";
import tool from "../../../data/tools/finance-employee-cost-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EmployeeCostCalculator />
    </>
  );
}
