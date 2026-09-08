import type { Metadata } from "next";
import ResizeAndRescalePdf from "../../../calculators/pdf/ResizeAndRescalePdf";
import tool from "../../../data/tools/tools-resize-and-rescale-pdf-online";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ResizeAndRescalePdf />
    </>
  );
}
