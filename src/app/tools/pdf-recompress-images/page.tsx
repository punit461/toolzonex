import type { Metadata } from "next";
import PdfRecompressImages from "../../../calculators/pdf/PdfRecompressImages";
import tool from "../../../data/tools/tools-pdf-recompress-images";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfRecompressImages />
    </>
  );
}
