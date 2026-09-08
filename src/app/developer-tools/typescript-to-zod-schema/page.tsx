import type { Metadata } from "next";
import TypeScriptToZodSchema from "../../../calculators/developer-tools/TypeScriptToZodSchema";
import tool from "../../../data/tools/developer-tools-typescript-to-zod-schema";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
