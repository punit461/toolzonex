import type { Metadata } from "next";
import AlphabetLearningTool from "../../../calculators/utilities/AlphabetLearningTool";
import tool from "../../../data/tools/utilities-alphabet-learning-tool";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AlphabetLearningTool />
    </>
  );
}
