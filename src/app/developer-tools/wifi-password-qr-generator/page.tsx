import type { Metadata } from "next";
import WifiPasswordQrGenerator from "../../../calculators/developer-tools/WifiPasswordQrGenerator";
import tool from "../../../data/tools/developer-tools-wifi-password-qr-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WifiPasswordQrGenerator />
    </>
  );
}
