import type { Metadata } from "next";
import SqlKeywordsUppercase from "../../../calculators/developer-tools/SqlKeywordsUppercase";
import tool from "../../../data/tools/developer-tools-sql-keywords-uppercase";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SqlKeywordsUppercase />
    </>
  );
}
