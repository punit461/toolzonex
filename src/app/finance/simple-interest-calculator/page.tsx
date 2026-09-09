import type { Metadata } from "next";
import SimpleInterestCalculator from "../../../calculators/finance/SimpleInterestCalculator";
import tool from "../../../data/tools/finance-simple-interest-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SimpleInterestCalculator />
    </>
  );
}
