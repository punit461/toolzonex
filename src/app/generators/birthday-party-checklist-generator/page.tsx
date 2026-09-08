import type { Metadata } from "next";
import BirthdayPartyChecklistGenerator from "../../../calculators/generators/BirthdayPartyChecklistGenerator";
import tool from "../../../data/tools/generators-birthday-party-checklist-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BirthdayPartyChecklistGenerator />
    </>
  );
}
