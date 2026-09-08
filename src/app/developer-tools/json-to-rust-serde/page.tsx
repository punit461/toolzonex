import type { Metadata } from "next";
import JsonToRustSerde from "../../../calculators/developer-tools/JsonToRustSerde";
import tool from "../../../data/tools/developer-tools-json-to-rust-serde";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToRustSerde />
    </>
  );
}
