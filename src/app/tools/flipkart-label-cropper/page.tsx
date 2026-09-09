import type { Metadata } from "next";
import FlipkartLabelCropper from "../../../calculators/pdf/FlipkartLabelCropper";
import tool from "../../../data/tools/tools-flipkart-label-cropper";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlipkartLabelCropper />
    </>
  );
}
