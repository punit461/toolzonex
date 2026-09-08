import type { Metadata } from "next";
import RandomHashGenerator from "../../../calculators/generators/RandomHashGenerator";
import tool from "../../../data/tools/generators-random-hash-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomHashGenerator />
    </>
  );
}
