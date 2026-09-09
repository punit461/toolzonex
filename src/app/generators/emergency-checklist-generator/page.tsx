import type { Metadata } from "next";
import EmergencyChecklistGenerator from "../../../calculators/generators/EmergencyChecklistGenerator";
import tool from "../../../data/tools/generators-emergency-checklist-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <EmergencyChecklistGenerator />
    </>
  );
}
