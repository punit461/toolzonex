import type { Metadata } from "next";
import CsvValidator from "../../../calculators/developer-tools/CsvValidator";
import tool from "../../../data/tools/developer-tools-csv-validator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CsvValidator />
    </>
  );
}
