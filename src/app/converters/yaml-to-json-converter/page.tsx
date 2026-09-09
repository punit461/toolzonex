import type { Metadata } from "next";
import YamlToJsonConverter from "../../../calculators/converters/YamlToJsonConverter";
import tool from "../../../data/tools/converters-yaml-to-json-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <YamlToJsonConverter />
    </>
  );
}
