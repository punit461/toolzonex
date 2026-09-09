import type { Metadata } from "next";
import AlphabeticalSorter from "../../../calculators/text-tools/AlphabeticalSorter";
import tool from "../../../data/tools/text-tools-alphabetical-sorter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AlphabeticalSorter />
    </>
  );
}
