import type { Metadata } from "next";
import CsvToTsvConverter from "../../../calculators/converters/CsvToTsvConverter";
import tool from "../../../data/tools/converters-csv-to-tsv-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CsvToTsvConverter />
    </>
  );
}
