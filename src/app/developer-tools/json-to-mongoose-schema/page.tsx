import type { Metadata } from "next";
import JsonToMongooseSchema from "../../../calculators/developer-tools/JsonToMongooseSchema";
import tool from "../../../data/tools/developer-tools-json-to-mongoose-schema";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToMongooseSchema />
    </>
  );
}
