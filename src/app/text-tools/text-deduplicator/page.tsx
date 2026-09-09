import type { Metadata } from "next";
import TextDeduplicator from "../../../calculators/text-tools/TextDeduplicator";
import tool from "../../../data/tools/text-tools-text-deduplicator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextDeduplicator />
    </>
  );
}
