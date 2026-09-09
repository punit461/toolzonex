import type { Metadata } from "next";
import WordFrequencyVisualizer from "../../../calculators/text-tools/WordFrequencyVisualizer";
import tool from "../../../data/tools/text-tools-word-frequency-visualizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WordFrequencyVisualizer />
    </>
  );
}
