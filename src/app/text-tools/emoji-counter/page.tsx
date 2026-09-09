import type { Metadata } from "next";
import EmojiCounter from "../../../calculators/text-tools/EmojiCounter";
import tool from "../../../data/tools/text-tools-emoji-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EmojiCounter />
    </>
  );
}
