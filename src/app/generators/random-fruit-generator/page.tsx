import type { Metadata } from "next";
import RandomFruitGenerator from "../../../calculators/generators/RandomFruitGenerator";
import tool from "../../../data/tools/generators-random-fruit-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RandomFruitGenerator />
    </>
  );
}
