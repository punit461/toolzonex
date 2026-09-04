import type { Metadata } from "next";
import JsonSchemaToProtobuf from "../../../calculators/developer-tools/JsonSchemaToProtobuf";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/json-schema-to-protobuf");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonSchemaToProtobuf />
    </>
  );
}
