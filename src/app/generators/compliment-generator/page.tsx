import type { Metadata } from "next";
import ComplimentGenerator from "../../../calculators/generators/ComplimentGenerator";
import tool from "../../../data/tools/generators-compliment-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ComplimentGenerator />
    </>
  );
}
