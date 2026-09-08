import type { Metadata } from "next";
import JsonSchemaToZodSchema from "../../../calculators/developer-tools/JsonSchemaToZodSchema";
import tool from "../../../data/tools/developer-tools-json-schema-to-zod-schema";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonSchemaToZodSchema />
    </>
  );
}
