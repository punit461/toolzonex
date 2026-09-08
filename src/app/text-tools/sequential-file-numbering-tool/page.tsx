import type { Metadata } from "next";
import SequentialFileNumberingTool from "../../../calculators/text-tools/SequentialFileNumberingTool";
import tool from "../../../data/tools/text-tools-sequential-file-numbering-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SequentialFileNumberingTool />
    </>
  );
}
