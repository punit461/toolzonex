import type { Metadata } from "next";
import FDCalculator from "../../../calculators/finance/FDCalculator";
import tool from "../../../data/tools/finance-fd-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FDCalculator />
    </>
  );
}
