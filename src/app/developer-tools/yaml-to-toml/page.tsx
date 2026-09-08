import type { Metadata } from "next";
import YamlToToml from "../../../calculators/developer-tools/YamlToToml";
import tool from "../../../data/tools/developer-tools-yaml-to-toml";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <YamlToToml />
    </>
  );
}
