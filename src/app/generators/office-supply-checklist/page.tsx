import type { Metadata } from "next";
import OfficeSupplyChecklist from "../../../calculators/generators/OfficeSupplyChecklist";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/office-supply-checklist");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <OfficeSupplyChecklist />
    </>
  );
}
