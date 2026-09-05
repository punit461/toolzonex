import type { Metadata } from "next";
import HttpStatusCodeLookup from "../../../calculators/developer-tools/HttpStatusCodeLookup";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/http-status-code-lookup");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HttpStatusCodeLookup />
    </>
  );
}
