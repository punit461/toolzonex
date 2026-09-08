import type { Metadata } from "next";
import MailtoLinkGenerator from "../../../calculators/tools/MailtoLinkGenerator";
import tool from "../../../data/tools/tools-mailto-link-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MailtoLinkGenerator />
    </>
  );
}
