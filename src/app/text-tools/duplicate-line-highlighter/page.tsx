import type { Metadata } from "next";
import DuplicateLineHighlighter from "../../../calculators/text-tools/DuplicateLineHighlighter";
import tool from "../../../data/tools/text-tools-duplicate-line-highlighter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DuplicateLineHighlighter />
    </>
  );
}
