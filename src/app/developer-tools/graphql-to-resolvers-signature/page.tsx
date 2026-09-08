import type { Metadata } from "next";
import GraphqlToResolversSignature from "../../../calculators/developer-tools/GraphqlToResolversSignature";
import tool from "../../../data/tools/developer-tools-graphql-to-resolvers-signature";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

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
