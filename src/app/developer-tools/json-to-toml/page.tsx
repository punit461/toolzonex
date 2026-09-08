import type { Metadata } from "next";
import JsonToTOML from "../../../calculators/developer-tools/JsonToTOML";
import tool from "../../../data/tools/developer-tools-json-to-toml";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToTOML />
    </>
  );
}
