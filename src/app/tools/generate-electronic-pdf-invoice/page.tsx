import type { Metadata } from "next";
import GeneratePdfInvoice from "../../../calculators/pdf/GeneratePdfInvoice";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/generate-electronic-pdf-invoice");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GeneratePdfInvoice />
    </>
  );
}
