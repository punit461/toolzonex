import type { Metadata } from "next";
import SlugGenerator from "../../../calculators/developer-tools/SlugGenerator";
import tool from "../../../data/tools/developer-tools-slug-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SlugGenerator />
    </>
  );
}
