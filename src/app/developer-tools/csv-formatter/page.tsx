import type { Metadata } from "next";
import CsvFormatter from "../../../calculators/developer-tools/CsvFormatter";
import tool from "../../../data/tools/developer-tools-csv-formatter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CsvFormatter />
    </>
  );
}
