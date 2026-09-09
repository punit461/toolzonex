import type { Metadata } from "next";
import CharacterNameGenerator from "../../../calculators/generators/CharacterNameGenerator";
import tool from "../../../data/tools/generators-character-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CharacterNameGenerator />
    </>
  );
}
