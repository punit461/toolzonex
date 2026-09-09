import type { Metadata } from "next";
import WordScrambler from "../../../calculators/text-tools/WordScrambler";
import tool from "../../../data/tools/text-tools-word-scrambler";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WordScrambler />
    </>
  );
}
