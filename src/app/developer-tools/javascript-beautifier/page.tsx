import type { Metadata } from "next";
import JavaScriptBeautifier from "../../../calculators/developer-tools/JavaScriptBeautifier";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/javascript-beautifier");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JavaScriptBeautifier />
    </>
  );
}
