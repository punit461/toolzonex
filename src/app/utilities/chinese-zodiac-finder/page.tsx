import type { Metadata } from "next";
import ChineseZodiacFinder from "../../../calculators/utilities/ChineseZodiacFinder";
import tool from "../../../data/tools/utilities-chinese-zodiac-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
