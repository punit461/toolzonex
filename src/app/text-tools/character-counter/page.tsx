import type { Metadata } from "next";
import CharacterCounter from "../../../calculators/text-tools/CharacterCounter";
import tool from "../../../data/tools/text-tools-character-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CharacterCounter />
    </>
  );
}
