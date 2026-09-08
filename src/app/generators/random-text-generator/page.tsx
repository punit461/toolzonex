import type { Metadata } from "next";
import RandomTextGenerator from "../../../calculators/generators/RandomTextGenerator";
import tool from "../../../data/tools/generators-random-text-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomTextGenerator />
    </>
  );
}
