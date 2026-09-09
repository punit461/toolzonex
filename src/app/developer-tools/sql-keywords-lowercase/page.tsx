import type { Metadata } from "next";
import SqlKeywordsLowercase from "../../../calculators/developer-tools/SqlKeywordsLowercase";
import tool from "../../../data/tools/developer-tools-sql-keywords-lowercase";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SqlKeywordsLowercase />
    </>
  );
}
