import type { Metadata } from "next";
import BikeMaintenanceChecklist from "../../../calculators/generators/BikeMaintenanceChecklist";
import tool from "../../../data/tools/generators-bike-maintenance-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BikeMaintenanceChecklist />
    </>
  );
}
