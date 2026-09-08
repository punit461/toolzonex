import type { Metadata } from "next";
import SqlFormatter from "../../../calculators/developer-tools/SqlFormatter";
import tool from "../../../data/tools/developer-tools-sql-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SqlFormatter />
    </>
  );
}
