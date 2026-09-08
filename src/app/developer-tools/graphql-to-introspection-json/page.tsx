import type { Metadata } from "next";
import GraphqlToIntrospectionJson from "../../../calculators/developer-tools/GraphqlToIntrospectionJson";
import tool from "../../../data/tools/developer-tools-graphql-to-introspection-json";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
