import type { Metadata } from "next";
import HtmlToMarkdown from "../../../calculators/utilities/HtmlToMarkdown";
import tool from "../../../data/tools/utilities-html-to-markdown";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlToMarkdown />
    </>
  );
}
