import type { Metadata } from "next";
import FlowToPlainJavaScript from "../../../calculators/developer-tools/FlowToPlainJavaScript";
import tool from "../../../data/tools/developer-tools-flow-to-plain-javascript";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlowToPlainJavaScript />
    </>
  );
}
