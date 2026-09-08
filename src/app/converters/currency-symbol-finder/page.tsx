import type { Metadata } from "next";
import CurrencySymbolFinder from "../../../calculators/converters/CurrencySymbolFinder";
import tool from "../../../data/tools/converters-currency-symbol-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CurrencySymbolFinder />
    </>
  );
}
