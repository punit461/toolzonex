import type { Metadata } from "next";
import TomlToYaml from "../../../calculators/developer-tools/TomlToYaml";
import tool from "../../../data/tools/developer-tools-toml-to-yaml";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TomlToYaml />
    </>
  );
}
