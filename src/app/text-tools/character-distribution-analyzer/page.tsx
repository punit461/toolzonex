import type { Metadata } from "next";
import CharacterDistributionAnalyzer from "../../../calculators/text-tools/CharacterDistributionAnalyzer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/character-distribution-analyzer");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CharacterDistributionAnalyzer />
    </>
  );
}
