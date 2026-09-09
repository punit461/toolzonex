import type { Metadata } from "next";
import XmlPrettyPrinter from "../../../calculators/developer-tools/XmlPrettyPrinter";
import tool from "../../../data/tools/developer-tools-xml-pretty-print";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <XmlPrettyPrinter />
    </>
  );
}
