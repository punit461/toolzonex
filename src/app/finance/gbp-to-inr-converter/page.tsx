import type { Metadata } from "next";
import GbpToInrConverter from "../../../calculators/finance/GbpToInrConverter";
import tool from "../../../data/tools/finance-gbp-to-inr-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GbpToInrConverter />
    </>
  );
}
