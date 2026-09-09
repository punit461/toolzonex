import type { Metadata } from "next";
import GeneratePdfInvoice from "../../../calculators/pdf/GeneratePdfInvoice";
import tool from "../../../data/tools/tools-generate-electronic-pdf-invoice";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
