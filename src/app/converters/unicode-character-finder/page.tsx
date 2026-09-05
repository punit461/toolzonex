import type { Metadata } from "next";
import UnicodeCharacterFinder from "../../../calculators/converters/UnicodeCharacterFinder";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/unicode-character-finder");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UnicodeCharacterFinder />
    </>
  );
}
