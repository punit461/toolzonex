import type { Metadata } from "next";
import WritingPromptStoryIdeaGenerator from "../../../calculators/generators/WritingPromptStoryIdeaGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/writing-prompt-story-idea-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <WritingPromptStoryIdeaGenerator />
    </>
  );
}
