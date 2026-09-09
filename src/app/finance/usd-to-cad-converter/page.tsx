import type { Metadata } from "next";
import UsdToCadConverter from "../../../calculators/finance/UsdToCadConverter";
import tool from "../../../data/tools/finance-usd-to-cad-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UsdToCadConverter />
    </>
  );
}
