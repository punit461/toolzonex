import type { Metadata } from "next";
import AlphabeticalSorter from "../../../calculators/text-tools/AlphabeticalSorter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/alphabetical-sorter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AlphabeticalSorter />
    </>
  );
}
