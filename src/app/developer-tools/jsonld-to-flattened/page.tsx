import type { Metadata } from "next";
import JsonLdToFlattened from "../../../calculators/developer-tools/JsonLdToFlattened";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/jsonld-to-flattened");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonLdToFlattened />
    </>
  );
}
