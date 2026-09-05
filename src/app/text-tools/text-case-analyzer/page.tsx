import type { Metadata } from "next";
import TextCaseAnalyzer from "../../../calculators/text-tools/TextCaseAnalyzer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/text-case-analyzer");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <TextCaseAnalyzer />
    </>
  );
}
