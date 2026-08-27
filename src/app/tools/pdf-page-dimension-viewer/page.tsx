import type { Metadata } from "next";
import PdfPageDimensionViewer from "../../../calculators/pdf/PdfPageDimensionViewer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-page-dimension-viewer");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfPageDimensionViewer />
    </>
  );
}
