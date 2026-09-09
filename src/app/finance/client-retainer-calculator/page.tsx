import type { Metadata } from "next";
import ClientRetainerCalculator from "../../../calculators/finance/ClientRetainerCalculator";
import tool from "../../../data/tools/finance-client-retainer-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ClientRetainerCalculator />
    </>
  );
}
