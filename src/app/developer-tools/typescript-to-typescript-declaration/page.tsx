import type { Metadata } from "next";
import TypeScriptToDeclaration from "../../../calculators/developer-tools/TypeScriptToDeclaration";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/typescript-to-typescript-declaration");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TypeScriptToDeclaration />
    </>
  );
}
