import type { Metadata } from "next";
import ConvertPdfToLetter from "../../../calculators/pdf/ConvertPdfToLetter";
import tool from "../../../data/tools/tools-convert-pdf-to-letter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToLetter />
    </>
  );
}
