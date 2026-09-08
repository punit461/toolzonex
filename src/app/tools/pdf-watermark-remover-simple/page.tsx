import type { Metadata } from "next";
import PdfWatermarkRemoverSimple from "../../../calculators/pdf/PdfWatermarkRemoverSimple";
import tool from "../../../data/tools/tools-pdf-watermark-remover-simple";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfWatermarkRemoverSimple />
    </>
  );
}
