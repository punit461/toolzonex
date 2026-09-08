import type { Metadata } from "next";
import UsdToAudConverter from "../../../calculators/finance/UsdToAudConverter";
import tool from "../../../data/tools/finance-usd-to-aud-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UsdToAudConverter />
    </>
  );
}
