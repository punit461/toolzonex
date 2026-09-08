import type { Metadata } from "next";
import TextMerger from "../../../calculators/tools/TextMerger";
import tool from "../../../data/tools/tools-text-merger";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextMerger />
    </>
  );
}
