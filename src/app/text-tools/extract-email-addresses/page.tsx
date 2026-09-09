import type { Metadata } from "next";
import ExtractEmailAddresses from "../../../calculators/text-tools/ExtractEmailAddresses";
import tool from "../../../data/tools/text-tools-extract-email-addresses";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ExtractEmailAddresses />
    </>
  );
}
