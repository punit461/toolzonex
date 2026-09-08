import type { Metadata } from "next";
import ParagraphIndentOutdentTool from "../../../calculators/text-tools/ParagraphIndentOutdentTool";
import tool from "../../../data/tools/text-tools-paragraph-indent-outdent-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ParagraphIndentOutdentTool />
    </>
  );
}
