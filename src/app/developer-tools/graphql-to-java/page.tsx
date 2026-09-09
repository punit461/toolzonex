import type { Metadata } from "next";
import GraphqlToJava from "../../../calculators/developer-tools/GraphqlToJava";
import tool from "../../../data/tools/developer-tools-graphql-to-java";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GraphqlToJava />
    </>
  );
}
