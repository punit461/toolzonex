import type { Metadata } from "next";
import WordCounter from "../../../calculators/text-tools/WordCounter";
import tool from "../../../data/tools/text-tools-word-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WordCounter />
    </>
  );
}
