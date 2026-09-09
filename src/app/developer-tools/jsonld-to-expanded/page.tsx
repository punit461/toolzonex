import type { Metadata } from "next";
import JsonLdToExpanded from "../../../calculators/developer-tools/JsonLdToExpanded";
import tool from "../../../data/tools/developer-tools-jsonld-to-expanded";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonLdToExpanded />
    </>
  );
}
