import type { Metadata } from "next";
import XmlFormatter from "../../../calculators/developer-tools/XmlFormatter";
import tool from "../../../data/tools/developer-tools-xml-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <XmlFormatter />
    </>
  );
}
