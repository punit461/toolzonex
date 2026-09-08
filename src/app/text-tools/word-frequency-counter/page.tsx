import type { Metadata } from "next";
import WordFrequencyCounter from "../../../calculators/text-tools/WordFrequencyCounter";
import tool from "../../../data/tools/text-tools-word-frequency-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WordFrequencyCounter />
    </>
  );
}
