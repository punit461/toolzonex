import type { Metadata } from "next";
import ExtractHyperlinks from "../../../calculators/pdf/ExtractHyperlinks";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/extract-hyperlinks");

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
