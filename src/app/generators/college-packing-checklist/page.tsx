import type { Metadata } from "next";
import CollegePackingChecklist from "../../../calculators/generators/CollegePackingChecklist";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/college-packing-checklist");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CollegePackingChecklist />
    </>
  );
}
