import type { Metadata } from "next";
import InvoiceTotalCalculator from "../../../calculators/finance/InvoiceTotalCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/invoice-total-calculator");

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
