import type { Metadata } from "next";
import ConvertPdfToA4 from "../../../calculators/pdf/ConvertPdfToA4";
import tool from "../../../data/tools/tools-convert-pdf-to-a4";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToA4 />
    </>
  );
}
