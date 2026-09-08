import type { Metadata } from "next";
import TsvToCsvConverter from "../../../calculators/converters/TsvToCsvConverter";
import tool from "../../../data/tools/converters-tsv-to-csv-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TsvToCsvConverter />
    </>
  );
}
