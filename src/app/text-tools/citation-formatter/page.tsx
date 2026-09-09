import type { Metadata } from "next";
import CitationFormatter from "../../../calculators/text-tools/CitationFormatter";
import tool from "../../../data/tools/text-tools-citation-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CitationFormatter />
    </>
  );
}
