import type { Metadata } from "next";
import WhatsAppLinkGenerator from "../../../calculators/tools/WhatsAppLinkGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/whatsapp-link-generator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WhatsAppLinkGenerator />
    </>
  );
}
