import type { Metadata } from "next";
import RemoveEmojis from "../../../calculators/text-tools/RemoveEmojis";
import tool from "../../../data/tools/text-tools-remove-emojis";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemoveEmojis />
    </>
  );
}
