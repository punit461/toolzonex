import type { Metadata } from "next";
import RemovePunctuation from "../../../calculators/text-tools/RemovePunctuation";
import tool from "../../../data/tools/text-tools-remove-punctuation";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemovePunctuation />
    </>
  );
}
