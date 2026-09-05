import type { Metadata } from "next";
import EmergencyChecklistGenerator from "../../../calculators/generators/EmergencyChecklistGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/emergency-checklist-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EmergencyChecklistGenerator />
    </>
  );
}
