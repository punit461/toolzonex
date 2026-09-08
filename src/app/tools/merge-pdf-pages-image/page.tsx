import type { Metadata } from "next";
import MergePdfPagesImage from "../../../calculators/pdf/MergePdfPagesImage";
import tool from "../../../data/tools/tools-merge-pdf-pages-image";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MergePdfPagesImage />
    </>
  );
}
