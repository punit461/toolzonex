import type { Metadata } from "next";
import TomlFormatter from "../../../calculators/developer-tools/TomlFormatter";
import tool from "../../../data/tools/developer-tools-toml-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TomlFormatter />
    </>
  );
}
