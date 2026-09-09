import type { Metadata } from "next";
import PdfTextStatistics from "../../../calculators/pdf/PdfTextStatistics";
import tool from "../../../data/tools/tools-pdf-text-statistics";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfTextStatistics />
    </>
  );
}
