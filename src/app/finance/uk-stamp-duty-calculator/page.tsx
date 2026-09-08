import type { Metadata } from "next";
import UKStampDutyCalculator from "../../../calculators/finance/UKStampDutyCalculator";
import tool from "../../../data/tools/finance-uk-stamp-duty-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UKStampDutyCalculator />
    </>
  );
}
