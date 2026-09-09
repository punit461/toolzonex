import type { Metadata } from "next";
import JsonSchemaToProtobuf from "../../../calculators/developer-tools/JsonSchemaToProtobuf";
import tool from "../../../data/tools/developer-tools-json-schema-to-protobuf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
