import type { Metadata } from "next";
import DuplicateContactFinder from "../../../calculators/text-tools/DuplicateContactFinder";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/duplicate-contact-finder");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DuplicateContactFinder />
    </>
  );
}
