import type { Metadata } from "next";
import JsonSchemaToOpenApi from "../../../calculators/developer-tools/JsonSchemaToOpenApi";
import tool from "../../../data/tools/developer-tools-json-schema-to-openapi-schema";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonSchemaToOpenApi />
    </>
  );
}
