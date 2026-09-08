import type { Metadata } from "next";
import RandomNumberGenerator from "../../../calculators/generators/RandomNumberGenerator";
import tool from "../../../data/tools/generators-random-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomNumberGenerator />
    </>
  );
}
