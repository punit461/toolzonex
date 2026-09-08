import type { Metadata } from "next";
import TextSimilarityChecker from "../../../calculators/text-tools/TextSimilarityChecker";
import tool from "../../../data/tools/text-tools-text-similarity-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TextSimilarityChecker />
    </>
  );
}
