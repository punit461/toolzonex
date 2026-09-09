import type { Metadata } from "next";
import MedicationReminderList from "../../../calculators/generators/MedicationReminderList";
import tool from "../../../data/tools/generators-medication-reminder-list";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MedicationReminderList />
    </>
  );
}
