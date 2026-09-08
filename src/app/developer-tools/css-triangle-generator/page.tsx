import type { Metadata } from "next";
import CssTriangleGenerator from "../../../calculators/developer-tools/CssTriangleGenerator";
import tool from "../../../data/tools/developer-tools-css-triangle-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssTriangleGenerator />
    </>
  );
}
