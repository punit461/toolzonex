import type { Metadata } from "next";
import ConvertPdfToLegal from "../../../calculators/pdf/ConvertPdfToLegal";
import tool from "../../../data/tools/tools-convert-pdf-to-legal";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToLegal />
    </>
  );
}
