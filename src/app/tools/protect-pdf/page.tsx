import type { Metadata } from "next";
import ProtectPdf from "../../../calculators/pdf/ProtectPdf";
import tool from "../../../data/tools/tools-protect-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ProtectPdf />
    </>
  );
}
