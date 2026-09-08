import type { Metadata } from "next";
import JsonLdToFlattened from "../../../calculators/developer-tools/JsonLdToFlattened";
import tool from "../../../data/tools/developer-tools-jsonld-to-flattened";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
