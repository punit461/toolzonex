import type { Metadata } from "next";
import ParagraphCounter from "../../../calculators/text-tools/ParagraphCounter";
import tool from "../../../data/tools/text-tools-paragraph-counter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ParagraphCounter />
    </>
  );
}
