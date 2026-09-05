import type { Metadata } from "next";
import FaviconHtmlGenerator from "../../../calculators/developer-tools/FaviconHtmlGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/favicon-html-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FaviconHtmlGenerator />
    </>
  );
}
