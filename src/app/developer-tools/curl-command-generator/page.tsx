import type { Metadata } from "next";
import CurlCommandGenerator from "../../../calculators/developer-tools/CurlCommandGenerator";
import tool from "../../../data/tools/developer-tools-curl-command-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CurlCommandGenerator />
    </>
  );
}
