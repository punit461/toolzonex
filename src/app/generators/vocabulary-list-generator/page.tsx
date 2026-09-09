import type { Metadata } from "next";
import VocabularyListGenerator from "../../../calculators/generators/VocabularyListGenerator";
import tool from "../../../data/tools/generators-vocabulary-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <VocabularyListGenerator />
    </>
  );
}
