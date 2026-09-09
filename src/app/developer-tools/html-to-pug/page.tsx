import type { Metadata } from "next";
import HtmlToPug from "../../../calculators/developer-tools/HtmlToPug";
import tool from "../../../data/tools/developer-tools-html-to-pug";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlToPug />
    </>
  );
}
