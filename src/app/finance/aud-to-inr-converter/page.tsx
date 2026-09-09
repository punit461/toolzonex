import type { Metadata } from "next";
import AudToInrConverter from "../../../calculators/finance/AudToInrConverter";
import tool from "../../../data/tools/finance-aud-to-inr-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AudToInrConverter />
    </>
  );
}
