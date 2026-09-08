import type { Metadata } from "next";
import SqlBeautifier from "../../../calculators/developer-tools/SqlBeautifier";
import tool from "../../../data/tools/developer-tools-sql-beautifier";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SqlBeautifier />
    </>
  );
}
