import type { Metadata } from "next";
import MergePdfPagesIntoImage from "../../../calculators/pdf/MergePdfPagesIntoImage";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/merge-pdf-pages-into-image");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MergePdfPagesIntoImage />
    </>
  );
}
