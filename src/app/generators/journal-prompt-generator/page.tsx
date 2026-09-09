import type { Metadata } from "next";
import JournalPromptGenerator from "../../../calculators/generators/JournalPromptGenerator";
import tool from "../../../data/tools/generators-journal-prompt-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <JournalPromptGenerator />
    </>
  );
}
