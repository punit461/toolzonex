import type { Metadata } from "next";
import Code128BarcodeGenerator from "../../../calculators/developer-tools/Code128BarcodeGenerator";
import tool from "../../../data/tools/developer-tools-code128-barcode-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Code128BarcodeGenerator />
    </>
  );
}
