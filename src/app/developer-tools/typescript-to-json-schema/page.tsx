import type { Metadata } from "next";
import TypeScriptToJsonSchema from "../../../calculators/developer-tools/TypeScriptToJsonSchema";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/typescript-to-json-schema");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TypeScriptToJsonSchema />
    </>
  );
}
