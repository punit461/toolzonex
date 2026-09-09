import type { Metadata } from "next";
import PdfLinkCounter from "../../../calculators/pdf/PdfLinkCounter";
import tool from "../../../data/tools/tools-pdf-link-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfLinkCounter />
    </>
  );
}
