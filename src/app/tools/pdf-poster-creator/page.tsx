import type { Metadata } from "next";
import PdfPosterCreator from "../../../calculators/pdf/PdfPosterCreator";
import tool from "../../../data/tools/tools-pdf-poster-creator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfPosterCreator />
    </>
  );
}
