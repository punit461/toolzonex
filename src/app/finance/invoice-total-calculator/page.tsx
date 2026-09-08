import type { Metadata } from "next";
import InvoiceTotalCalculator from "../../../calculators/finance/InvoiceTotalCalculator";
import tool from "../../../data/tools/finance-invoice-total-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InvoiceTotalCalculator />
    </>
  );
}
