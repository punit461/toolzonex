import type { Metadata } from "next";
import FreelanceProjectProfitCalculator from "../../../calculators/finance/FreelanceProjectProfitCalculator";
import tool from "../../../data/tools/finance-freelance-project-profit-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FreelanceProjectProfitCalculator />
    </>
  );
}
