import type { Metadata } from "next";
import Ean13BarcodeGenerator from "../../../calculators/developer-tools/Ean13BarcodeGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/ean13-barcode-generator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Ean13BarcodeGenerator />
    </>
  );
}
