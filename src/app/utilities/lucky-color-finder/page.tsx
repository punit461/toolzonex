import type { Metadata } from "next";
import LuckyColorFinder from "../../../calculators/utilities/LuckyColorFinder";
import tool from "../../../data/tools/utilities-lucky-color-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <LuckyColorFinder />
    </>
  );
}
