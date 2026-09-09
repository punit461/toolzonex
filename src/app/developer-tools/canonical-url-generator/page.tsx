import type { Metadata } from "next";
import CanonicalUrlGenerator from "../../../calculators/developer-tools/CanonicalUrlGenerator";
import tool from "../../../data/tools/developer-tools-canonical-url-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CanonicalUrlGenerator />
    </>
  );
}
