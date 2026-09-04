import type { Metadata } from "next";
import CurlCommandGenerator from "../../../calculators/developer-tools/CurlCommandGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/curl-command-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CurlCommandGenerator />
    </>
  );
}
