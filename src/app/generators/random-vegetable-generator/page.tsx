import type { Metadata } from "next";
import RandomVegetableGenerator from "../../../calculators/generators/RandomVegetableGenerator";
import tool from "../../../data/tools/generators-random-vegetable-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomVegetableGenerator />
    </>
  );
}
