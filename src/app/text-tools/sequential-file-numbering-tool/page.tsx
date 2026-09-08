import type { Metadata } from "next";
import SequentialFileNumberingTool from "../../../calculators/text-tools/SequentialFileNumberingTool";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/sequential-file-numbering-tool");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SequentialFileNumberingTool />
    </>
  );
}
