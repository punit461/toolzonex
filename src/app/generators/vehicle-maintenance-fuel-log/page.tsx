import type { Metadata } from "next";
import VehicleMaintenanceFuelLog from "../../../calculators/generators/VehicleMaintenanceFuelLog";
import tool from "../../../data/tools/generators-vehicle-maintenance-fuel-log";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <VehicleMaintenanceFuelLog />
    </>
  );
}
