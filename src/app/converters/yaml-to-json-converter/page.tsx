import type { Metadata } from "next";
import YamlToJsonConverter from "../../../calculators/converters/YamlToJsonConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/yaml-to-json-converter");

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
