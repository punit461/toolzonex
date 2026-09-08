import type { Metadata } from "next";
import HtmlEncoder from "../../../calculators/converters/HtmlEncoder";
import tool from "../../../data/tools/converters-html-encoder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlEncoder />
    </>
  );
}
