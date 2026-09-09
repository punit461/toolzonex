import type { Metadata } from "next";
import SentenceCaseFixer from "../../../calculators/text-tools/SentenceCaseFixer";
import tool from "../../../data/tools/text-tools-sentence-case-fixer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SentenceCaseFixer />
    </>
  );
}
