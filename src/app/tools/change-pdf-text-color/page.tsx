import type { Metadata } from "next";
import ChangePdfTextColor from "../../../calculators/pdf/ChangePdfTextColor";
import tool from "../../../data/tools/tools-change-pdf-text-color";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ChangePdfTextColor />
    </>
  );
}
