import type { Metadata } from "next";
import CssFilterGenerator from "../../../calculators/developer-tools/CssFilterGenerator";
import tool from "../../../data/tools/developer-tools-css-filter-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssFilterGenerator />
    </>
  );
}
