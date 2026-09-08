import type { Metadata } from "next";
import SignPdf from "../../../calculators/pdf/SignPdf";
import tool from "../../../data/tools/tools-sign-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SignPdf />
    </>
  );
}
