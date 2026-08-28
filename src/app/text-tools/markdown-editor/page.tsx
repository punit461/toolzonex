import type { Metadata } from "next";
import MarkdownEditor from "../../../calculators/text-tools/MarkdownEditor";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/markdown-editor");

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
