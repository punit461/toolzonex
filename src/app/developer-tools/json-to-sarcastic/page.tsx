import type { Metadata } from "next";
import JsonToSarcastic from "../../../calculators/developer-tools/JsonToSarcastic";
import tool from "../../../data/tools/developer-tools-json-to-sarcastic";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToSarcastic />
    </>
  );
}
