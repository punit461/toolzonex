import type { Metadata } from "next";
import PdfColorInverter from "../../../calculators/pdf/PdfColorInverter";
import tool from "../../../data/tools/tools-pdf-color-inverter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfColorInverter />
    </>
  );
}
