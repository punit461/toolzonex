import type { Metadata } from "next";
import TypeScriptToFlow from "../../../calculators/developer-tools/TypeScriptToFlow";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/typescript-to-flow");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TypeScriptToFlow />
    </>
  );
}
