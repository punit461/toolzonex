import type { Metadata } from "next";
import TypeScriptToZodSchema from "../../../calculators/developer-tools/TypeScriptToZodSchema";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/typescript-to-zod-schema");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TypeScriptToZodSchema />
    </>
  );
}
