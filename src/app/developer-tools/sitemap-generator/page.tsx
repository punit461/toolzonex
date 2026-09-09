import type { Metadata } from "next";
import SitemapGenerator from "../../../calculators/developer-tools/SitemapGenerator";
import tool from "../../../data/tools/developer-tools-sitemap-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SitemapGenerator />
    </>
  );
}
