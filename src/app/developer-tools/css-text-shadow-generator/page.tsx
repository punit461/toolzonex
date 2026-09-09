import type { Metadata } from "next";
import CssTextShadowGenerator from "../../../calculators/developer-tools/CssTextShadowGenerator";
import tool from "../../../data/tools/developer-tools-css-text-shadow-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssTextShadowGenerator />
    </>
  );
}
