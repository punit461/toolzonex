import type { Metadata } from "next";
import FlowToTypeScript from "../../../calculators/developer-tools/FlowToTypeScript";
import tool from "../../../data/tools/developer-tools-flow-to-typescript";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlowToTypeScript />
    </>
  );
}
