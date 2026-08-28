import type { Metadata } from "next";
import PdfBlackAndWhiteConverter from "../../../calculators/pdf/PdfBlackAndWhiteConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/pdf-black-and-white-converter");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PdfBlackAndWhiteConverter />
    </>
  );
}
