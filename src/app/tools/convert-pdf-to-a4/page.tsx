import type { Metadata } from "next";
import ConvertPdfToA4 from "../../../calculators/pdf/ConvertPdfToA4";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/convert-pdf-to-a4");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToA4 />
    </>
  );
}
