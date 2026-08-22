import type { Metadata } from "next";
import SelfEmploymentTaxCalculator from "../../../calculators/finance/SelfEmploymentTaxCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/self-employment-tax-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SelfEmploymentTaxCalculator />
    </>
  );
}
