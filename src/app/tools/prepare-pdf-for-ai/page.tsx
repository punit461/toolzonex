import type { Metadata } from "next";
import PreparePdfForAi from "../../../calculators/pdf/PreparePdfForAi";
import tool from "../../../data/tools/tools-prepare-pdf-for-ai";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PreparePdfForAi />
    </>
  );
}
