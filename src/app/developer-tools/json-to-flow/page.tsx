import type { Metadata } from "next";
import JsonToFlow from "../../../calculators/developer-tools/JsonToFlow";
import tool from "../../../data/tools/developer-tools-json-to-flow";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <JsonToFlow />
    </>
  );
}
