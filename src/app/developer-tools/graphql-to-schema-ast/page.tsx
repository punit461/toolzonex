import type { Metadata } from "next";
import GraphqlToSchemaAst from "../../../calculators/developer-tools/GraphqlToSchemaAst";
import tool from "../../../data/tools/developer-tools-graphql-to-schema-ast";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GraphqlToSchemaAst />
    </>
  );
}
