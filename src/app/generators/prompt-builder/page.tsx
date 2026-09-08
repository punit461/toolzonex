import type { Metadata } from "next";
import PromptBuilder from "../../../calculators/generators/PromptBuilder";
import tool from "../../../data/tools/generators-prompt-builder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PromptBuilder />
    </>
  );
}
