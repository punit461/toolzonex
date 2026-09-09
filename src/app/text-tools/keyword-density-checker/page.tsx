import type { Metadata } from "next";
import KeywordDensityChecker from "../../../calculators/text-tools/KeywordDensityChecker";
import tool from "../../../data/tools/text-tools-keyword-density-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <KeywordDensityChecker />
    </>
  );
}
