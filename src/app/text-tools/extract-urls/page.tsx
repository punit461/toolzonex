import type { Metadata } from "next";
import ExtractUrls from "../../../calculators/text-tools/ExtractUrls";
import tool from "../../../data/tools/text-tools-extract-urls";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ExtractUrls />
    </>
  );
}
