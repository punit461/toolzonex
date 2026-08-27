import type { Metadata } from "next";
import ExtractPdfBookmarks from "../../../calculators/pdf/ExtractPdfBookmarks";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/extract-pdf-bookmarks");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ExtractPdfBookmarks />
    </>
  );
}
