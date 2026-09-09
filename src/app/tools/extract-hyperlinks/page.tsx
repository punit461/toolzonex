import type { Metadata } from "next";
import ExtractHyperlinks from "../../../calculators/pdf/ExtractHyperlinks";
import tool from "../../../data/tools/tools-extract-hyperlinks";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ExtractHyperlinks />
    </>
  );
}
