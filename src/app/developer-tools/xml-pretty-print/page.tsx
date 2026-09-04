import type { Metadata } from "next";
import XmlPrettyPrinter from "../../../calculators/developer-tools/XmlPrettyPrinter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/xml-pretty-print");

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
