import type { Metadata } from "next";
import KeywordDensityAnalyzer from "../../../calculators/text-tools/KeywordDensityAnalyzer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/keyword-density-analyzer");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <KeywordDensityAnalyzer />
    </>
  );
}
