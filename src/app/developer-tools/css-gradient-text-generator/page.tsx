import type { Metadata } from "next";
import CssGradientTextGenerator from "../../../calculators/developer-tools/CssGradientTextGenerator";
import tool from "../../../data/tools/developer-tools-css-gradient-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssGradientTextGenerator />
    </>
  );
}
