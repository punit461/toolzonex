import type { Metadata } from "next";
import RandomEmojiGenerator from "../../../calculators/generators/RandomEmojiGenerator";
import tool from "../../../data/tools/generators-random-emoji-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomEmojiGenerator />
    </>
  );
}
