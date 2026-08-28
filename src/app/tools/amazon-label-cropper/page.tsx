import type { Metadata } from "next";
import AmazonLabelCropper from "../../../calculators/pdf/AmazonLabelCropper";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/amazon-label-cropper");

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
