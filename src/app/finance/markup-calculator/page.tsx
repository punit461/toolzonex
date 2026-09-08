import type { Metadata } from "next";
import MarkupCalculator from "../../../calculators/finance/MarkupCalculator";
import tool from "../../../data/tools/finance-markup-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MarkupCalculator />
    </>
  );
}
