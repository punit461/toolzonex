import type { Metadata } from "next";
import PdfToJpg from "../../../calculators/pdf/PdfToJpg";
import tool from "../../../data/tools/tools-pdf-to-jpg";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfToJpg />
    </>
  );
}
