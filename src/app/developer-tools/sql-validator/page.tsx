import type { Metadata } from "next";
import SqlValidator from "../../../calculators/developer-tools/SqlValidator";
import tool from "../../../data/tools/developer-tools-sql-validator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SqlValidator />
    </>
  );
}
