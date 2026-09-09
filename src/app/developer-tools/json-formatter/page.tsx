import type { Metadata } from "next";
import JsonFormatter from "../../../calculators/developer-tools/JsonFormatter";
import tool from "../../../data/tools/developer-tools-json-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonFormatter />
    </>
  );
}
