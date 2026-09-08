import type { Metadata } from "next";
import MarkdownEditor from "../../../calculators/text-tools/MarkdownEditor";
import tool from "../../../data/tools/text-tools-markdown-editor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MarkdownEditor />
    </>
  );
}
