import type { Metadata } from "next";
import JsonLdToNQuads from "../../../calculators/developer-tools/JsonLdToNQuads";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/jsonld-to-n-quads");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonLdToNQuads />
    </>
  );
}
