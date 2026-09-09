import type { Metadata } from "next";
import CssMinifier from "../../../calculators/developer-tools/CssMinifier";
import tool from "../../../data/tools/developer-tools-css-minifier";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssMinifier />
    </>
  );
}
