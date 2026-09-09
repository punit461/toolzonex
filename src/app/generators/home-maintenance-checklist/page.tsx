import type { Metadata } from "next";
import HomeMaintenanceChecklist from "../../../calculators/generators/HomeMaintenanceChecklist";
import tool from "../../../data/tools/generators-home-maintenance-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HomeMaintenanceChecklist />
    </>
  );
}
