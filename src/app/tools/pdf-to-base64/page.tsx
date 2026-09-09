import type { Metadata } from "next";
import PdfToBase64 from "../../../calculators/pdf/PdfToBase64";
import tool from "../../../data/tools/tools-pdf-to-base64";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToBase64 />
    </>
  );
}
