import type { Metadata } from "next";
import BarcodeNumberGenerator from "../../../calculators/generators/BarcodeNumberGenerator";
import tool from "../../../data/tools/generators-barcode-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BarcodeNumberGenerator />
    </>
  );
}
