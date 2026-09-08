import type { Metadata } from "next";
import HttpStatusCodeLookup from "../../../calculators/developer-tools/HttpStatusCodeLookup";
import tool from "../../../data/tools/developer-tools-http-status-code-lookup";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HttpStatusCodeLookup />
    </>
  );
}
