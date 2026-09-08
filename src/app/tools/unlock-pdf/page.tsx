import type { Metadata } from "next";
import UnlockPdf from "../../../calculators/pdf/UnlockPdf";
import tool from "../../../data/tools/tools-unlock-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <UnlockPdf />
    </>
  );
}
