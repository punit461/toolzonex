import type { Metadata } from "next";
import TextDiffTool from "../../../calculators/tools/TextDiffTool";
import tool from "../../../data/tools/tools-text-diff-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextDiffTool />
    </>
  );
}
