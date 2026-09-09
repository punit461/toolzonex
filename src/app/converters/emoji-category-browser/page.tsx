import type { Metadata } from "next";
import EmojiCategoryBrowser from "../../../calculators/converters/EmojiCategoryBrowser";
import tool from "../../../data/tools/converters-emoji-category-browser";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EmojiCategoryBrowser />
    </>
  );
}
