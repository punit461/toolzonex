import type { Metadata } from "next";
import JpgToPdf from "../../../calculators/pdf/JpgToPdf";
import tool from "../../../data/tools/tools-jpg-to-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JpgToPdf />
    </>
  );
}
