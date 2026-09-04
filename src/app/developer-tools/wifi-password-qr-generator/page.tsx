import type { Metadata } from "next";
import WifiPasswordQrGenerator from "../../../calculators/developer-tools/WifiPasswordQrGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/wifi-password-qr-generator");

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
