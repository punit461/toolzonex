import type { Metadata } from "next";
import JsonToJava from "../../../calculators/developer-tools/JsonToJava";
import tool from "../../../data/tools/developer-tools-json-to-java";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToJava />
    </>
  );
}
