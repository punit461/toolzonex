import type { Metadata } from "next";
import RemovePdfImages from "../../../calculators/pdf/RemovePdfImages";
import tool from "../../../data/tools/tools-remove-pdf-images";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemovePdfImages />
    </>
  );
}
