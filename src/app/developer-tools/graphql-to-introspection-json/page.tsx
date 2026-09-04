import type { Metadata } from "next";
import GraphqlToIntrospectionJson from "../../../calculators/developer-tools/GraphqlToIntrospectionJson";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/graphql-to-introspection-json");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GraphqlToIntrospectionJson />
    </>
  );
}
