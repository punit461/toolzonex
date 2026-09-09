import type { Metadata } from "next";
import QrCodeScanner from "../../../calculators/developer-tools/QrCodeScanner";
import tool from "../../../data/tools/developer-tools-qr-code-scanner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <QrCodeScanner />
    </>
  );
}
