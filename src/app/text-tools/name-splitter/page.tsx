import type { Metadata } from "next";
import NameSplitter from "../../../calculators/text-tools/NameSplitter";
import tool from "../../../data/tools/text-tools-name-splitter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NameSplitter />
    </>
  );
}
