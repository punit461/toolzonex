import type { Metadata } from "next";
import CssBorderRadiusGenerator from "../../../calculators/developer-tools/CssBorderRadiusGenerator";
import tool from "../../../data/tools/developer-tools-css-border-radius-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssBorderRadiusGenerator />
    </>
  );
}
