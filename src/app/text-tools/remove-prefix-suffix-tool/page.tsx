import type { Metadata } from "next";
import RemovePrefixSuffixTool from "../../../calculators/text-tools/RemovePrefixSuffixTool";
import tool from "../../../data/tools/text-tools-remove-prefix-suffix-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemovePrefixSuffixTool />
    </>
  );
}
