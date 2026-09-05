import type { Metadata } from "next";
import SqlKeywordsLowercase from "../../../calculators/developer-tools/SqlKeywordsLowercase";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/sql-keywords-lowercase");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SqlKeywordsLowercase />
    </>
  );
}
