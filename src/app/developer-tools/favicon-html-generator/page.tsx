import type { Metadata } from "next";
import FaviconHtmlGenerator from "../../../calculators/developer-tools/FaviconHtmlGenerator";
import tool from "../../../data/tools/developer-tools-favicon-html-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FaviconHtmlGenerator />
    </>
  );
}
