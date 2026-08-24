import type { Metadata } from "next";
import ReorderPdfPages from "../../../calculators/pdf/ReorderPdfPages";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/reorder-pdf-pages");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ReorderPdfPages />
    </>
  );
}
