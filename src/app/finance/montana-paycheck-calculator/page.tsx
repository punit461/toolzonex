import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";
import tool from "../../../data/tools/finance-montana-paycheck-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaycheckCalculator stateSlug="montana" />
    </>
  );
}
