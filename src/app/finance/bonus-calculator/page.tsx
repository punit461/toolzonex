import type { Metadata } from "next";
import BonusCalculator from "../../../calculators/finance/BonusCalculator";
import tool from "../../../data/tools/finance-bonus-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BonusCalculator />
    </>
  );
}
