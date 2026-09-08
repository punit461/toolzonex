import type { Metadata } from "next";
import RemovePdfBorder from "../../../calculators/pdf/RemovePdfBorder";
import tool from "../../../data/tools/tools-remove-pdf-border";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemovePdfBorder />
    </>
  );
}
