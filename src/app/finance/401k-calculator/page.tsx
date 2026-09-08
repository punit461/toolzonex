import type { Metadata } from "next";
import US401kCalculator from "../../../calculators/finance/US401kCalculator";
import tool from "../../../data/tools/finance-401k-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <US401kCalculator />
    </>
  );
}
