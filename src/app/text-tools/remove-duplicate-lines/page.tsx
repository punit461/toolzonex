import type { Metadata } from "next";
import RemoveDuplicateLines from "../../../calculators/text-tools/RemoveDuplicateLines";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/remove-duplicate-lines");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveDuplicateLines />
    </>
  );
}
