import type { Metadata } from "next";
import URLExtractor from "../../../calculators/tools/URLExtractor";
import tool from "../../../data/tools/tools-url-extractor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <URLExtractor />
    </>
  );
}
