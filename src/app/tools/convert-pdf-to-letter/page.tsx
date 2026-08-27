import type { Metadata } from "next";
import ConvertPdfToLetter from "../../../calculators/pdf/ConvertPdfToLetter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/convert-pdf-to-letter");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConvertPdfToLetter />
    </>
  );
}
