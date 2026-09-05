import type { Metadata } from "next";
import VehicleMaintenanceFuelLog from "../../../calculators/generators/VehicleMaintenanceFuelLog";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/vehicle-maintenance-fuel-log");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <VehicleMaintenanceFuelLog />
    </>
  );
}
