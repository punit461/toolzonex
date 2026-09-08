import type { Metadata } from "next";
import MetaTagGenerator from "../../../calculators/developer-tools/MetaTagGenerator";
import tool from "../../../data/tools/developer-tools-meta-tag-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MetaTagGenerator />
    </>
  );
}
