import type { Metadata } from "next";
import CssTransformGenerator from "../../../calculators/developer-tools/CssTransformGenerator";
import tool from "../../../data/tools/developer-tools-css-transform-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CssTransformGenerator />
    </>
  );
}
