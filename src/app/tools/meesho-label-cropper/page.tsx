import type { Metadata } from "next";
import MeeshoLabelCropper from "../../../calculators/pdf/MeeshoLabelCropper";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/meesho-label-cropper");

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
