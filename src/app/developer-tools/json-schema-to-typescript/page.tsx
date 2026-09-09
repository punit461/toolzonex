import type { Metadata } from "next";
import JsonSchemaToTypeScript from "../../../calculators/developer-tools/JsonSchemaToTypeScript";
import tool from "../../../data/tools/developer-tools-json-schema-to-typescript";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonSchemaToTypeScript />
    </>
  );
}
