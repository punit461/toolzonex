import type { Metadata } from "next";
import RemoveDuplicateLines from "../../../calculators/text-tools/RemoveDuplicateLines";
import tool from "../../../data/tools/text-tools-remove-duplicate-lines";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveDuplicateLines />
    </>
  );
}
