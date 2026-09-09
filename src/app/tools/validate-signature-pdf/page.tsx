import type { Metadata } from "next";
import ValidateSignaturePdf from "../../../calculators/pdf/ValidateSignaturePdf";
import tool from "../../../data/tools/tools-validate-signature-pdf";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ValidateSignaturePdf />
    </>
  );
}
