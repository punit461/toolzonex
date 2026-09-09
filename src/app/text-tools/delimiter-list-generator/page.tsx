import type { Metadata } from "next";
import DelimiterListGenerator from "../../../calculators/text-tools/DelimiterListGenerator";
import tool from "../../../data/tools/text-tools-delimiter-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DelimiterListGenerator />
    </>
  );
}
