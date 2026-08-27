import type { Metadata } from "next";
import ExtractImagesFromPdf from "../../../calculators/pdf/ExtractImagesFromPdf";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/extract-images-from-pdf");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ExtractImagesFromPdf />
    </>
  );
}
