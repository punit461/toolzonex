import type { Metadata } from "next";
import AnagramChecker from "../../../calculators/text-tools/AnagramChecker";
import tool from "../../../data/tools/text-tools-anagram-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AnagramChecker />
    </>
  );
}
