import type { Metadata } from "next";
import TypeScriptToDeclaration from "../../../calculators/developer-tools/TypeScriptToDeclaration";
import tool from "../../../data/tools/developer-tools-typescript-to-typescript-declaration";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
