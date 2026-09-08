import type { Metadata } from "next";
import RandomLetterGenerator from "../../../calculators/generators/RandomLetterGenerator";
import tool from "../../../data/tools/generators-random-letter-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomLetterGenerator />
    </>
  );
}
