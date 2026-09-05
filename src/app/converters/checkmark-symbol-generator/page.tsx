import type { Metadata } from "next";
import CheckmarkSymbolGenerator from "../../../calculators/converters/CheckmarkSymbolGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/converters/checkmark-symbol-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CheckmarkSymbolGenerator />
    </>
  );
}
