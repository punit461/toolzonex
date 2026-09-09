import type { Metadata } from "next";
import CheckmarkSymbolGenerator from "../../../calculators/converters/CheckmarkSymbolGenerator";
import tool from "../../../data/tools/converters-checkmark-symbol-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CheckmarkSymbolGenerator />
    </>
  );
}
