import type { Metadata } from "next";
import ImageResizer from "../../../calculators/tools/ImageResizer";
import tool from "../../../data/tools/tools-image-resizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ImageResizer />
    </>
  );
}
