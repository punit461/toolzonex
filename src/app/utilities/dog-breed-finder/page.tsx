import type { Metadata } from "next";
import DogBreedFinder from "../../../calculators/utilities/DogBreedFinder";
import tool from "../../../data/tools/utilities-dog-breed-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DogBreedFinder />
    </>
  );
}
