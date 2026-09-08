import type { Metadata } from "next";
import WhitespaceCleaner from "../../../calculators/text-tools/WhitespaceCleaner";
import tool from "../../../data/tools/text-tools-whitespace-cleaner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WhitespaceCleaner />
    </>
  );
}
