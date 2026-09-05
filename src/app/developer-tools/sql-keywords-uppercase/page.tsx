import type { Metadata } from "next";
import SqlKeywordsUppercase from "../../../calculators/developer-tools/SqlKeywordsUppercase";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/sql-keywords-uppercase");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SqlKeywordsUppercase />
    </>
  );
}
