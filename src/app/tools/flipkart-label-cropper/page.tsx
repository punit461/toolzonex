import type { Metadata } from "next";
import FlipkartLabelCropper from "../../../calculators/pdf/FlipkartLabelCropper";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/flipkart-label-cropper");

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
