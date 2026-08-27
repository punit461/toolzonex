import type { Metadata } from "next";
import MergePdfPagesImage from "../../../calculators/pdf/MergePdfPagesImage";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/merge-pdf-pages-image");

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
