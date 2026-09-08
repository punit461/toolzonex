import type { Metadata } from "next";
import AddPdfFooter from "../../../calculators/pdf/AddPdfFooter";
import tool from "../../../data/tools/tools-add-pdf-footer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AddPdfFooter />
    </>
  );
}
