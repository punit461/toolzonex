import type { Metadata } from "next";
import UnicodeCharacterFinder from "../../../calculators/converters/UnicodeCharacterFinder";
import tool from "../../../data/tools/converters-unicode-character-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UnicodeCharacterFinder />
    </>
  );
}
