import type { Metadata } from "next";
import StarSymbolGenerator from "../../../calculators/converters/StarSymbolGenerator";
import tool from "../../../data/tools/converters-star-symbol-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <StarSymbolGenerator />
    </>
  );
}
