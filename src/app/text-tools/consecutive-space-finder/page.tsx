import type { Metadata } from "next";
import ConsecutiveSpaceFinder from "../../../calculators/text-tools/ConsecutiveSpaceFinder";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/consecutive-space-finder");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ConsecutiveSpaceFinder />
    </>
  );
}
