import type { Metadata } from "next";
import PdfBlackAndWhiteConverter from "../../../calculators/pdf/PdfBlackAndWhiteConverter";
import tool from "../../../data/tools/tools-pdf-black-and-white-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfBlackAndWhiteConverter />
    </>
  );
}
