import type { Metadata } from "next";
import AmazonLabelCropper from "../../../calculators/pdf/AmazonLabelCropper";
import tool from "../../../data/tools/tools-amazon-label-cropper";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AmazonLabelCropper />
    </>
  );
}
