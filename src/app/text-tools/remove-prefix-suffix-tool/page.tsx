import type { Metadata } from "next";
import RemovePrefixSuffixTool from "../../../calculators/text-tools/RemovePrefixSuffixTool";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/remove-prefix-suffix-tool");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemovePrefixSuffixTool />
    </>
  );
}
