import type { Metadata } from "next";
import JsonToMobxStateTree from "../../../calculators/developer-tools/JsonToMobxStateTree";
import tool from "../../../data/tools/developer-tools-json-to-mobx-state-tree";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToMobxStateTree />
    </>
  );
}
