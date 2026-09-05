import type { Metadata } from "next";
import AlphabetIndexGenerator from "../../../calculators/text-tools/AlphabetIndexGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/alphabet-index-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AlphabetIndexGenerator />
    </>
  );
}
