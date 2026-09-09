import type { Metadata } from "next";
import TextSplitter from "../../../calculators/text-tools/TextSplitter";
import tool from "../../../data/tools/text-tools-text-splitter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextSplitter />
    </>
  );
}
