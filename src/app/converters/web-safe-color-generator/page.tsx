import type { Metadata } from "next";
import WebSafeColorGenerator from "../../../calculators/converters/WebSafeColorGenerator";
import tool from "../../../data/tools/converters-web-safe-color-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WebSafeColorGenerator />
    </>
  );
}
