import type { Metadata } from "next";
import PdfWatermarkRemoverSimple from "../../../calculators/pdf/PdfWatermarkRemoverSimple";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-watermark-remover-simple");

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
