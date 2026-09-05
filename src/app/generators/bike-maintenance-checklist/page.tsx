import type { Metadata } from "next";
import BikeMaintenanceChecklist from "../../../calculators/generators/BikeMaintenanceChecklist";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/bike-maintenance-checklist");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BikeMaintenanceChecklist />
    </>
  );
}
