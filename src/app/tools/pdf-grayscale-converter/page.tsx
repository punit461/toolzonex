import type { Metadata } from "next";
import PdfGrayscaleConverter from "../../../calculators/pdf/PdfGrayscaleConverter";
import tool from "../../../data/tools/tools-pdf-grayscale-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfGrayscaleConverter />
    </>
  );
}
