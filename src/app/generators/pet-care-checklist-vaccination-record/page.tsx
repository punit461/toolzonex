import type { Metadata } from "next";
import PetCareChecklistVaccinationRecord from "../../../calculators/generators/PetCareChecklistVaccinationRecord";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/pet-care-checklist-vaccination-record");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PetCareChecklistVaccinationRecord />
    </>
  );
}
