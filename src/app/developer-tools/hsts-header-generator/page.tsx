import type { Metadata } from "next";
import HstsHeaderGenerator from "../../../calculators/developer-tools/HstsHeaderGenerator";
import tool from "../../../data/tools/developer-tools-hsts-header-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HstsHeaderGenerator />
    </>
  );
}
