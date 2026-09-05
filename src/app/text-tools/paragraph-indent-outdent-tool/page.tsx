import type { Metadata } from "next";
import ParagraphIndentOutdentTool from "../../../calculators/text-tools/ParagraphIndentOutdentTool";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/paragraph-indent-outdent-tool");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ParagraphIndentOutdentTool />
    </>
  );
}
