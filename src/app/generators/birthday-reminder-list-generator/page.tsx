import type { Metadata } from "next";
import BirthdayReminderListGenerator from "../../../calculators/generators/BirthdayReminderListGenerator";
import tool from "../../../data/tools/generators-birthday-reminder-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BirthdayReminderListGenerator />
    </>
  );
}
