import type { Metadata } from "next";
import OpenSearchGenerator from "../../../calculators/developer-tools/OpenSearchGenerator";
import tool from "../../../data/tools/developer-tools-opensearch-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <OpenSearchGenerator />
    </>
  );
}
