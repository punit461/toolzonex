import type { Metadata } from "next";
import IraRothCalculator from "../../../calculators/finance/IraRothCalculator";
import tool from "../../../data/tools/finance-ira-roth-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <IraRothCalculator />
    </>
  );
}
