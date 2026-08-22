import type { Metadata } from "next";
import WordFrequencyAnalyzer from "../../../calculators/tools/WordFrequencyAnalyzer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/word-frequency-analyzer");

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
