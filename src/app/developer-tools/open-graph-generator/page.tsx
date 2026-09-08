import type { Metadata } from "next";
import OpenGraphGenerator from "../../../calculators/developer-tools/OpenGraphGenerator";
import tool from "../../../data/tools/developer-tools-open-graph-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OpenGraphGenerator />
    </>
  );
}
