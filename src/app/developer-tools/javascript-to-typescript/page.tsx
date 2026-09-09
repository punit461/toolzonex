import type { Metadata } from "next";
import JavaScriptToTypeScript from "../../../calculators/developer-tools/JavaScriptToTypeScript";
import tool from "../../../data/tools/developer-tools-javascript-to-typescript";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JavaScriptToTypeScript />
    </>
  );
}
