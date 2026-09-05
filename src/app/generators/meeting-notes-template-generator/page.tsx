import type { Metadata } from "next";
import MeetingNotesTemplateGenerator from "../../../calculators/generators/MeetingNotesTemplateGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/meeting-notes-template-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MeetingNotesTemplateGenerator />
    </>
  );
}
