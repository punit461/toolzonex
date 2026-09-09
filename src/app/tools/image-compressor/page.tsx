import type { Metadata } from "next";
import ImageCompressor from "../../../calculators/pdf/ImageCompressor";
import tool from "../../../data/tools/tools-image-compressor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ImageCompressor />
    </>
  );
}
