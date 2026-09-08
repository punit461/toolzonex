import type { Metadata } from "next";
import PdfPageCounter from "../../../calculators/pdf/PdfPageCounter";
import tool from "../../../data/tools/tools-pdf-page-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfPageCounter />
    </>
  );
}
