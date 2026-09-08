import type { Metadata } from "next";
import PdfAnnotationRemover from "../../../calculators/pdf/PdfAnnotationRemover";
import tool from "../../../data/tools/tools-pdf-annotation-remover";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfAnnotationRemover />
    </>
  );
}
