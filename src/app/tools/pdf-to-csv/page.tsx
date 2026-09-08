import type { Metadata } from "next";
import PdfToCsv from "../../../calculators/pdf/PdfToCsv";
import tool from "../../../data/tools/tools-pdf-to-csv";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToCsv />
    </>
  );
}
