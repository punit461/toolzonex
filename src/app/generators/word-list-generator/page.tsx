import type { Metadata } from "next";
import WordListGenerator from "../../../calculators/generators/WordListGenerator";
import tool from "../../../data/tools/generators-word-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WordListGenerator />
    </>
  );
}
