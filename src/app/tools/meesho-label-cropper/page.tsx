import type { Metadata } from "next";
import MeeshoLabelCropper from "../../../calculators/pdf/MeeshoLabelCropper";
import tool from "../../../data/tools/tools-meesho-label-cropper";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MeeshoLabelCropper />
    </>
  );
}
