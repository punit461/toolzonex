import type { Metadata } from "next";
import ChineseZodiacFinder from "../../../calculators/utilities/ChineseZodiacFinder";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/chinese-zodiac-finder");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ChineseZodiacFinder />
    </>
  );
}
