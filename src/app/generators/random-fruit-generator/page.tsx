import type { Metadata } from "next";
import RandomFruitGenerator from "../../../calculators/generators/RandomFruitGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/random-fruit-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RandomFruitGenerator />
    </>
  );
}
