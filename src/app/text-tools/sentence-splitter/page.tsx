import type { Metadata } from "next";
import SentenceSplitter from "../../../calculators/text-tools/SentenceSplitter";
import tool from "../../../data/tools/text-tools-sentence-splitter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SentenceSplitter />
    </>
  );
}
