import type { Metadata } from "next";
import FlowToTypeScript from "../../../calculators/developer-tools/FlowToTypeScript";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/flow-to-typescript");

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
