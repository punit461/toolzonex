import type { Metadata } from "next";
import JsonToGoBson from "../../../calculators/developer-tools/JsonToGoBson";
import tool from "../../../data/tools/developer-tools-json-to-go-bson";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToGoBson />
    </>
  );
}
