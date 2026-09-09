import type { Metadata } from "next";
import PdfObjectCounter from "../../../calculators/pdf/PdfObjectCounter";
import tool from "../../../data/tools/tools-pdf-object-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfObjectCounter />
    </>
  );
}
