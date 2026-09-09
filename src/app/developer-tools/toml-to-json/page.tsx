import type { Metadata } from "next";
import TomlToJson from "../../../calculators/developer-tools/TomlToJson";
import tool from "../../../data/tools/developer-tools-toml-to-json";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TomlToJson />
    </>
  );
}
