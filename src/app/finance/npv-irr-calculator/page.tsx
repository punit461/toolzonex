import type { Metadata } from "next";
import NpvIrrCalculator from "../../../calculators/finance/NpvIrrCalculator";
import tool from "../../../data/tools/finance-npv-irr-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NpvIrrCalculator />
    </>
  );
}
