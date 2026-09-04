import type { Metadata } from "next";
import JsonSchemaToZodSchema from "../../../calculators/developer-tools/JsonSchemaToZodSchema";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/json-schema-to-zod-schema");

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
