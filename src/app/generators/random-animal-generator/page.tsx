import type { Metadata } from "next";
import RandomAnimalGenerator from "../../../calculators/generators/RandomAnimalGenerator";
import tool from "../../../data/tools/generators-random-animal-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomAnimalGenerator />
    </>
  );
}
