import type { Metadata } from "next";
import GraphqlToFlow from "../../../calculators/developer-tools/GraphqlToFlow";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/graphql-to-flow");

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
