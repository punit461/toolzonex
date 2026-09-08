import type { Metadata } from "next";
import UnicodeCharacterLookup from "../../../calculators/converters/UnicodeCharacterLookup";
import tool from "../../../data/tools/converters-unicode-character-lookup";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UnicodeCharacterLookup />
    </>
  );
}
