import type { Metadata } from "next";
import PetCareChecklistVaccinationRecord from "../../../calculators/generators/PetCareChecklistVaccinationRecord";
import tool from "../../../data/tools/generators-pet-care-checklist-vaccination-record";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PetCareChecklistVaccinationRecord />
    </>
  );
}
