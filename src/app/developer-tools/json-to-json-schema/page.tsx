import type { Metadata } from "next";
import JsonToJsonSchema from "../../../calculators/developer-tools/JsonToJsonSchema";
import tool from "../../../data/tools/developer-tools-json-to-json-schema";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToJsonSchema />
    </>
  );
}
