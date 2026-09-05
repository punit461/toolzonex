import type { Metadata } from "next";
import AppointmentReservationListGenerator from "../../../calculators/generators/AppointmentReservationListGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/appointment-reservation-list-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AppointmentReservationListGenerator />
    </>
  );
}
