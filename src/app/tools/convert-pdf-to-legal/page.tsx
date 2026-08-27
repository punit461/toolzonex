import type { Metadata } from "next";
import ConvertPdfToLegal from "../../../calculators/pdf/ConvertPdfToLegal";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/convert-pdf-to-legal");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToLegal />
    </>
  );
}
