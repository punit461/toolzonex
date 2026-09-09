import type { Metadata } from "next";
import CountryCapitalFinder from "../../../calculators/utilities/CountryCapitalFinder";
import tool from "../../../data/tools/utilities-country-capital-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CountryCapitalFinder />
    </>
  );
}
