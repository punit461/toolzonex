import type { Metadata } from "next";
import FlipPdfHorizontally from "../../../calculators/pdf/FlipPdfHorizontally";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/flip-pdf-horizontally");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlipPdfHorizontally />
    </>
  );
}
