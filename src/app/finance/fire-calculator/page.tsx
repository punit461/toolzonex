import type { Metadata } from "next";
import FireCalculator from "../../../calculators/finance/FireCalculator";
import tool from "../../../data/tools/finance-fire-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FireCalculator />
    </>
  );
}
