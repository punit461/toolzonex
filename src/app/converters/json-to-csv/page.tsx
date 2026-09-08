import type { Metadata } from "next";
import JsonToCsvConverter from "../../../calculators/converters/JsonToCsvConverter";
import tool from "../../../data/tools/converters-json-to-csv";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToCsvConverter />
    </>
  );
}
