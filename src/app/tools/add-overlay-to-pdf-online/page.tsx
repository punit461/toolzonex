import type { Metadata } from "next";
import AddOverlayToPdf from "../../../calculators/pdf/AddOverlayToPdf";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/add-overlay-to-pdf-online");

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
