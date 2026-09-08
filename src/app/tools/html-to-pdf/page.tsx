import type { Metadata } from "next";
import HtmlToPdf from "../../../calculators/pdf/HtmlToPdf";
import tool from "../../../data/tools/tools-html-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlToPdf />
    </>
  );
}
