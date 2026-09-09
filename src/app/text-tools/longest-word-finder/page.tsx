import type { Metadata } from "next";
import LongestWordFinder from "../../../calculators/text-tools/LongestWordFinder";
import tool from "../../../data/tools/text-tools-longest-word-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <LongestWordFinder />
    </>
  );
}
