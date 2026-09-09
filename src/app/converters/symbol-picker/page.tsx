import type { Metadata } from "next";
import SymbolPicker from "../../../calculators/converters/SymbolPicker";
import tool from "../../../data/tools/converters-symbol-picker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SymbolPicker />
    </>
  );
}
