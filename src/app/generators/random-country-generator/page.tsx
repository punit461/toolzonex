import type { Metadata } from "next";
import RandomCountryGenerator from "../../../calculators/generators/RandomCountryGenerator";
import tool from "../../../data/tools/generators-random-country-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomCountryGenerator />
    </>
  );
}
