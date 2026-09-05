import type { Metadata } from "next";
import EmojiCategoryBrowser from "../../../calculators/converters/EmojiCategoryBrowser";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/emoji-category-browser");

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
