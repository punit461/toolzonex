import type { Metadata } from "next";
import PetNameGenerator from "../../../calculators/generators/PetNameGenerator";
import tool from "../../../data/tools/generators-pet-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PetNameGenerator />
    </>
  );
}
