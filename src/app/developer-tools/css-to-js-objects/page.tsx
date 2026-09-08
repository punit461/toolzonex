import type { Metadata } from "next";
import CssToJsObjects from "../../../calculators/developer-tools/CssToJsObjects";
import tool from "../../../data/tools/developer-tools-css-to-js-objects";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CssToJsObjects />
    </>
  );
}
