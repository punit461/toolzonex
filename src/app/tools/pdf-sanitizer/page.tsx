import type { Metadata } from "next";
import PdfSanitizer from "../../../calculators/pdf/PdfSanitizer";
import tool from "../../../data/tools/tools-pdf-sanitizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfSanitizer />
    </>
  );
}
