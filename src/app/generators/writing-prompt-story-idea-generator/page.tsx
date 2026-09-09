import type { Metadata } from "next";
import WritingPromptStoryIdeaGenerator from "../../../calculators/generators/WritingPromptStoryIdeaGenerator";
import tool from "../../../data/tools/generators-writing-prompt-story-idea-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WritingPromptStoryIdeaGenerator />
    </>
  );
}
