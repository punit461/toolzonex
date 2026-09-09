import type { Metadata } from "next";
import WordWrapTool from "../../../calculators/text-tools/WordWrapTool";
import tool from "../../../data/tools/text-tools-word-wrap-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WordWrapTool />
    </>
  );
}
