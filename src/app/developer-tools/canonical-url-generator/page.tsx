import type { Metadata } from "next";
import CanonicalUrlGenerator from "../../../calculators/developer-tools/CanonicalUrlGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/canonical-url-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CanonicalUrlGenerator />
    </>
  );
}
