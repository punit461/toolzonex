import type { Metadata } from "next";
import WordFrequencyAnalyzer from "../../../calculators/tools/WordFrequencyAnalyzer";
import tool from "../../../data/tools/tools-word-frequency-analyzer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WordFrequencyAnalyzer />
    </>
  );
}
