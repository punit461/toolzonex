import type { Metadata } from "next";
import JsonLdToNormalized from "../../../calculators/developer-tools/JsonLdToNormalized";
import tool from "../../../data/tools/developer-tools-jsonld-to-normalized";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonLdToNormalized />
    </>
  );
}
