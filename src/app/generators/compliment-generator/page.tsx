import type { Metadata } from "next";
import ComplimentGenerator from "../../../calculators/generators/ComplimentGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/compliment-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ComplimentGenerator />
    </>
  );
}
