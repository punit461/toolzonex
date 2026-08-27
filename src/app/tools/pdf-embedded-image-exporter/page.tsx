import type { Metadata } from "next";
import PdfEmbeddedImageExporter from "../../../calculators/pdf/PdfEmbeddedImageExporter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-embedded-image-exporter");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfEmbeddedImageExporter />
    </>
  );
}
