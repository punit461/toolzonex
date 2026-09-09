import type { Metadata } from "next";
import HtmlEntityEncoder from "../../../calculators/converters/HtmlEntityEncoder";
import tool from "../../../data/tools/converters-html-entity-encode-decode";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlEntityEncoder />
    </>
  );
}
