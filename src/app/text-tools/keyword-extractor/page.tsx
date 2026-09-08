import type { Metadata } from "next";
import KeywordExtractor from "../../../calculators/text-tools/KeywordExtractor";
import tool from "../../../data/tools/text-tools-keyword-extractor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <KeywordExtractor />
    </>
  );
}
