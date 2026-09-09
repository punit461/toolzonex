import type { Metadata } from "next";
import EmailToPdf from "../../../calculators/pdf/EmailToPdf";
import tool from "../../../data/tools/tools-email-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EmailToPdf />
    </>
  );
}
