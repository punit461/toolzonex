import type { Metadata } from "next";
import MeetingNotesTemplateGenerator from "../../../calculators/generators/MeetingNotesTemplateGenerator";
import tool from "../../../data/tools/generators-meeting-notes-template-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MeetingNotesTemplateGenerator />
    </>
  );
}
