import type { Metadata } from "next";
import HashtagGenerator from "../../../calculators/generators/HashtagGenerator";
import tool from "../../../data/tools/generators-hashtag-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HashtagGenerator />
    </>
  );
}
