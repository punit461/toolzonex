import type { Metadata } from "next";
import TextReverser from "../../../calculators/text-tools/TextReverser";
import tool from "../../../data/tools/text-tools-text-reverser";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextReverser />
    </>
  );
}
