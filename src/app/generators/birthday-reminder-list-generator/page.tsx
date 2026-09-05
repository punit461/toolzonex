import type { Metadata } from "next";
import BirthdayReminderListGenerator from "../../../calculators/generators/BirthdayReminderListGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/birthday-reminder-list-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BirthdayReminderListGenerator />
    </>
  );
}
