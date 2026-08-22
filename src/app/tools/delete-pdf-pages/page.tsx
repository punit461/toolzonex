import type { Metadata } from "next";
import DeletePdfPages from "../../../calculators/pdf/DeletePdfPages";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/delete-pdf-pages");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DeletePdfPages />
    </>
  );
}
