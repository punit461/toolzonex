import type { Metadata } from "next";
import TypeScriptToPlainJavaScript from "../../../calculators/developer-tools/TypeScriptToPlainJavaScript";
import tool from "../../../data/tools/developer-tools-typescript-to-plain-javascript";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TypeScriptToPlainJavaScript />
    </>
  );
}
