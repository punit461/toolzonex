import type { Metadata } from "next";
import TextCleaner from "../../../calculators/text-tools/TextCleaner";
import tool from "../../../data/tools/text-tools-text-cleaner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TextCleaner />
    </>
  );
}
