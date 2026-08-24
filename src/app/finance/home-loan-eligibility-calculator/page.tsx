import type { Metadata } from "next";
import HomeLoanEligibilityCalculator from "../../../calculators/finance/HomeLoanEligibilityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/home-loan-eligibility-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HomeLoanEligibilityCalculator />
    </>
  );
}
