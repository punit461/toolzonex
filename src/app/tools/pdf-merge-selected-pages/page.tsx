import type { Metadata } from "next";
import PdfMergeSelectedPages from "../../../calculators/pdf/PdfMergeSelectedPages";
import tool from "../../../data/tools/tools-pdf-merge-selected-pages";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfMergeSelectedPages />
    </>
  );
}
