import type { Metadata } from "next";
import ShortestWordFinder from "../../../calculators/text-tools/ShortestWordFinder";
import tool from "../../../data/tools/text-tools-shortest-word-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ShortestWordFinder />
    </>
  );
}
