import type { Metadata } from "next";
import HtmlToBbcode from "../../../calculators/converters/HtmlToBbcode";
import tool from "../../../data/tools/converters-html-to-bbcode";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HtmlToBbcode />
    </>
  );
}
