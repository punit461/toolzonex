import type { Metadata } from "next";
import PdfNUpCreator from "../../../calculators/pdf/PdfNUpCreator";
import tool from "../../../data/tools/tools-pdf-n-up-creator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfNUpCreator />
    </>
  );
}
