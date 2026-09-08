import type { Metadata } from "next";
import AppointmentReservationListGenerator from "../../../calculators/generators/AppointmentReservationListGenerator";
import tool from "../../../data/tools/generators-appointment-reservation-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AppointmentReservationListGenerator />
    </>
  );
}
