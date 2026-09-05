import type { Metadata } from "next";
import IcebreakerQuestionGenerator from "../../../calculators/generators/IcebreakerQuestionGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/icebreaker-question-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <IcebreakerQuestionGenerator />
    </>
  );
}
