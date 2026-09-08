import type { Metadata } from "next";
import QrCodeGenerator from "../../../calculators/qr/QrCodeGenerator";
import tool from "../../../data/tools/developer-tools-qr-code-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <QrCodeGenerator />
    </>
  );
}
