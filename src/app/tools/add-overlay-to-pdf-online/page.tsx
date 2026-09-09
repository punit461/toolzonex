import type { Metadata } from "next";
import AddOverlayToPdf from "../../../calculators/pdf/AddOverlayToPdf";
import tool from "../../../data/tools/tools-add-overlay-to-pdf-online";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddOverlayToPdf />
    </>
  );
}
