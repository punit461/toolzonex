import type { Metadata } from "next";
import WordFrequencyVisualizer from "../../../calculators/text-tools/WordFrequencyVisualizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/word-frequency-visualizer");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WordFrequencyVisualizer />
    </>
  );
}
