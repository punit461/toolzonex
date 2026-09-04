import type { Metadata } from "next";
import GraphqlToResolversSignature from "../../../calculators/developer-tools/GraphqlToResolversSignature";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/graphql-to-resolvers-signature");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GraphqlToResolversSignature />
    </>
  );
}
