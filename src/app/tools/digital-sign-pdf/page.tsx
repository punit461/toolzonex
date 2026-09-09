import type { Metadata } from "next";
import DigitalSignPdf from "../../../calculators/pdf/DigitalSignPdf";
import tool from "../../../data/tools/tools-digital-sign-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DigitalSignPdf />
    </>
  );
}
