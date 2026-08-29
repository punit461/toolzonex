import type { Metadata } from "next";
import RemoveEmptyLines from "../../../calculators/text-tools/RemoveEmptyLines";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/remove-empty-lines");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RemoveEmptyLines />
    </>
  );
}
