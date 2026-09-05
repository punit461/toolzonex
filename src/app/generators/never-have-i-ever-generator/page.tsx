import type { Metadata } from "next";
import NeverHaveIEverGenerator from "../../../calculators/generators/NeverHaveIEverGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/never-have-i-ever-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <NeverHaveIEverGenerator />
    </>
  );
}
