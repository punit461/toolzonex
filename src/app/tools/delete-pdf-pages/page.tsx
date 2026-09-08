import type { Metadata } from "next";
import DeletePdfPages from "../../../calculators/pdf/DeletePdfPages";
import tool from "../../../data/tools/tools-delete-pdf-pages";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
