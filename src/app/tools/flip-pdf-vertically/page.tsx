import type { Metadata } from "next";
import FlipPdfVertically from "../../../calculators/pdf/FlipPdfVertically";
import tool from "../../../data/tools/tools-flip-pdf-vertically";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlipPdfVertically />
    </>
  );
}
