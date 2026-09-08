import type { Metadata } from "next";
import MarkdownPreview from "../../../calculators/text-tools/MarkdownPreview";
import tool from "../../../data/tools/text-tools-markdown-preview";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MarkdownPreview />
    </>
  );
}
