import type { Metadata } from "next";
import GraphqlToFlow from "../../../calculators/developer-tools/GraphqlToFlow";
import tool from "../../../data/tools/developer-tools-graphql-to-flow";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GraphqlToFlow />
    </>
  );
}
